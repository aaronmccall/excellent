var assign = require('lodash.assign');
var async = require('async');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var Zip = require('jszip');
var slugify = require('../../client/helpers/slugify');
var Generator = require('./generator');

var cheerioOptions = {xmlMode: true};
var excelDir = path.resolve(path.join(__dirname));
var excelPath = path.join.bind(path, excelDir);

function Compiler(data) {
    this.data = data;
    this.tour = data.tour;
    this.generator = new Generator(data.tour, data.options);
}

module.exports = Compiler;

assign(Compiler.prototype, {
    getMetadata: function () {
        var tour = this.data.tour;
        var headerList = [tour.artist.name, tour.name.replace(tour.artist.name, '').trim(), tour.guaranteeSummary];
        return {
            header: headerList.join(' '),
            columns: ['date'].concat(this.generator.getOutputKeys()),
            filename: slugify.apply(null, headerList.slice(0, -1))
        };
    },
    getData: function (callback) {
        // Load zip file
        var dataArchive = new Zip(this.generator.generate(), {base64: false});
        var data = {
            meta: this.getMetadata(),
            sheetData: this.getSheetData(dataArchive),
            sharedStrings: this.getSharedStrings(dataArchive)
        };

        this.getStyles(function (err, styles) {
            data.styles = !err && styles;
            callback(err, data);
        });
    },
    getSheetData: function (dataArchive) {
        // Get sheet data
        var sheetDoc = dataArchive.file('xl/worksheets/sheet1.xml').asText(); 
        var $sheetDoc = cheerio.load(sheetDoc, cheerioOptions);
        return {
            dimensionRef: $sheetDoc('dimension').attr('ref'),
            rows: $sheetDoc('sheetData').html(),
            mergeCells: $sheetDoc('mergeCells').html()
        };
    },
    getSharedStrings: function (dataArchive) {
        return dataArchive.file('xl/sharedStrings.xml').asText();
    },
    getStyles: function (callback) {
        var stylePath = excelPath('styles', 'styles.xml');
        fs.readFile(stylePath, callback);
    },
    getTemplate: function (callback) {
        var templatePath = excelPath('template.xlsx');
        fs.readFile(templatePath, function (err, buffer) {
            callback(err, !err && new Zip(buffer, {base64: false}));
        });
    },
    getResources: function (callback) {
        async.parallel({
            data: this.getData.bind(this),
            template: this.getTemplate.bind(this)
        }, callback);
    },
    compile: function (callback) {
        var self = this;
        async.waterfall([
            this.getResources.bind(this),
            function _build(resources, wfNext) {
                var template = resources.template;
                var data = resources.data;
                async.parallel([
                    function _replaceStylesAndStrings(prNext) {
                        template.file('xl/styles.xml', data.styles);
                        template.file('xl/sharedStrings.xml', data.sharedStrings);
                        prNext(null);
                    },
                    function _updateWorksheet(prNext) {
                        var styles = self.generator.styles;
                        var worksheetPath = 'xl/worksheets/sheet1.xml';
                        var templateWsDoc = template.file(worksheetPath).asText();
                        var $templateWsDoc = cheerio.load(templateWsDoc, cheerioOptions);
                        var origHeader = $templateWsDoc('oddHeader').text();
                        var finalHeader = origHeader.replace('{{Header}}', data.meta.header);
                        // TODO: determine best way to set row heights per row so we can override
                        // this when necessary.
                        // Set default row height
                        // var $sheetFormatPr = $templateWsDoc('sheetFormatPr');
                        // $sheetFormatPr.attr('defaultRowHeight', 15.1);
                        // $sheetFormatPr.attr('customHeight', 1);
                        // Set final header
                        $templateWsDoc('oddHeader').text(finalHeader);
                        // Update dimension
                        $templateWsDoc('dimension').attr('ref', data.sheetData.dimensionRef);
                        // Add cell rows
                        $templateWsDoc('sheetData').html(data.sheetData.rows);
                        // Add merge directives
                        $templateWsDoc('sheetData').after('<mergeCells>' + data.sheetData.mergeCells + '</mergeCells>');
                        // add column widths based on resources.data.meta.columns
                        var cols = data.meta.columns.map(function (col) { return styles.columns[col]; });
                        $templateWsDoc('cols').html(styles.cols({cols: cols}));
                        template.file(worksheetPath, $templateWsDoc.html());
                        prNext(null, resources);
                    }
                ], function (err) {
                    try {
                        wfNext(err, !err && { 
                            xlsx: template.generate({
                                type: 'nodebuffer',
                                compression: 'DEFLATE'
                            }),
                            filename: data.meta.filename
                        });
                    } catch (e) {
                        console.log('error generating zip:', e);
                        wfNext(e);
                    }
                });
            }
        ], callback);
    }
});

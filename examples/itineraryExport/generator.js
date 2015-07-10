var assign = require('lodash.assign');
var defaults = require('lodash.defaults');
var util = require('util');
var ExcelGenerator = require('../excelGenerator');
var defaultStyles = require('./styles/styles');

var cellStyles = {
    location: 'Bold',
    buyerNote: 'Italic',
    dealNote: 'Italic',
    showAnnotation: 'Italic',
    showNote: 'Italic'
};
cellStyles.buyerNote = cellStyles.showNote;
cellStyles.dealNote = cellStyles.showNote;
cellStyles.showAnnotation = cellStyles.showNote;

function TourPrintGenerator(data, options, styles) {
    ExcelGenerator.call(this, data, options, defaults({cellStyles: cellStyles}, styles, defaultStyles));
}

module.exports = TourPrintGenerator;

util.inherits(TourPrintGenerator, ExcelGenerator);

assign(TourPrintGenerator.prototype, {
    initialize: function () {
        var ws = this.getSheet('Tour Itinerary');
        this.addRow(ws, this.getColumnHeaders());
        this.addDays(ws, this.data.days);
    },
    getCellStyle: function (bgColor, key) {
        var type = this.styles.cellStyles[key] || 'Normal';
        if (bgColor === '#FFFFFF') {
            return this.styles[type.toLowerCase() + 'Style'];
        } else {
            return this.styles[bgColor.slice(1) + type];
        }
    },
    addDays: function (ws, days) {
        var self = this;
        days.forEach(function (day) {
            self.dayAsRows(day).forEach(function (row) {
                var r = ws.range.e.r;
                self.addRow(ws, row);
                if (row.notPerforming) {
                    self.addNonPerfMerge(ws, r, row);
                }
            });
        });
    },
    addNonPerfMerge: function (ws, r, row) {
        this.addMerge(ws, {s: {r: r, c: row.beforeReason}, e: {r: r, c: row.cells.length-2}});
    },
    dayAsRows: function (day) {
        var self = this;
        var keys = this.getOutputKeys();
        var rows = [];
        var row = {cells: [{v: day.date, t: 's'}]};
        if (day.shows && day.shows.length) {
            day.shows.forEach(function (show) {
                var cellStyle;
                if (show.notPerforming) {
                    row.notPerforming = show.notPerforming;
                    var beforeReason = 0;
                    cellStyle = {
                        s: (show.bgColor === '#FFFFFF') ? self.styles.nonPerfStyle : self.getCellStyle(show.bgColor, 'notPerforming')
                    };
                    if (keys.indexOf('location') !== -1) {
                        row.cells.push(assign({v: show.location || '', t: 's'}, cellStyle));
                        beforeReason++;
                    }
                    if (keys.indexOf('country') !== -1) {
                        row.cells.push(assign({v: show.country || '', t: 's'}, cellStyle));
                        beforeReason++;
                    }
                    row.cells.push(assign({v: show.notPerformingReason || '', t: 's'}, cellStyle));
                    keys.slice(beforeReason).forEach(function () { row.cells.push(assign({t: 's'}, cellStyle)); });
                    // add one more for date cell
                    row.beforeReason = ++beforeReason;
                } else {
                    keys.forEach(function (key) {
                        var cell = {v: show[key] || ''};
                        cell.t = self.valueTypes[(typeof cell.v)] || 's';
                        cell.s = self.getCellStyle(show.bgColor, key);
                        row.cells.push(cell);
                    });
                }
                rows.push(row);
                row = {cells: [{v: '', t: 's'}]};
            });
        } else {
            rows.push(row);
        }
        return rows;
    }
});

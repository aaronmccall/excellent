var assign = require('lodash.assign');
var defaults = require('lodash.defaults');
var omit = require('lodash.omit');
var pick = require('lodash.pick');
var XLSX = require('xlsx-style');

var defaultOptions = {
    headerLabels: {},
    displayOptions: {},
    xlsx: {
        bookSST: true,
        bookType: 'xlsx',
        type: 'binary'
    }
};

function ExcelGenerator(data, options, styles) {
    this.data = data;
    this.initOptions(defaults(options || {}, defaultOptions));
    this.styles = styles;
    this.initialize();
}

module.exports = ExcelGenerator;

assign(ExcelGenerator.prototype, {
    defaultSheetName: 'Sheet1',
    valueTypes: {
        string: 's',
        number: 'n',
        boolean: 'b'
    },
    initOptions: function (options) {
        this.options = options;
    },
    initialize: function () {},
    getOutputKeys: function () {
        return [];
    },
    getColumnHeaders: function () {
        return {cells: []};
    },
    getCellRef: function (row, column) {
        return XLSX.utils.encode_cell({r:row, c:column});
    },
    getRangeRef: function (range) {
        return XLSX.utils.encode_range(range);
    },
    getCustprops: function () {
        return {};
    },
    getHeaderStyle: function () {
        return 0;
    },
    getHyperlinks: function () {
        var ws = this.getSheet();
        return ws && ws.hyperlinks;
    },
    getProps: function () {
        return {};
    },
    getSheet: function (sheetName) {
        var wb = this.getWorkbook();
        var ws = wb.Sheets[sheetName || this.defaultSheetName];
        if (ws) return ws;
        wb.SheetNames.push(sheetName || this.defaultSheetName);
        return (wb.Sheets[sheetName || this.defaultSheetName] = {
            range: {
                s: {c: 0, r: 0},
                e: {c: 0, r: -1}
            }
        });
    },
    getWorkbook: function () {
        return this._wb || (this._wb = {
            Sheets: {},
            Props: this.getProps(),
            Custprops: this.getCustprops(),
            SSF: {},
            SheetNames: []
        });
    },
    addRows: function (sheet, rows) {
        if (!rows && Array.isArray(sheet)) {
            rows = sheet;
            sheet = this.getSheet(this.getWorkbook().SheetNames[0]);
        }
        var ws = typeof sheet === 'object' ? sheet : this.getSheet(sheet);
        rows.forEach(this.addRow.bind(this, ws));
    },
    addRow: function (ws, row) {
        var self = this;
        if (!row.cells.length) return;
        var range = ws.range;
        var r = ++range.e.r;
        row.cells.forEach(function (cell, c) {
            if (range.e.c < c) range.e.c = c;
            var ref = self.getCellRef(r, c);
            ws[ref] = pick(cell, ['f', 's','v','t']);
            if (cell.hyperlink) {
                self.addHyperlink(ws, ref, cell.hyperlink);
            }
        });
        if (row.merges) row.merges.forEach(function (merge) {
            self.addMerge(ws, {
                s: {r: r, c: merge.start},
                e: {r: r, c: merge.end}
            });
        });
    },
    addHyperlink: function (ws, ref, hyperlink) {
        var links = ws.hyperlinks|| (ws.hyperlinks = []);
        hyperlink.ref = ref;
        links.push(hyperlink);
    },
    addMerge: function (sheet, range) {
        if (!range && typeof sheet === 'object') {
            range = sheet;
            sheet = this.getSheet(this.getWorkbook().SheetNames[0]);
        }
        var ws = typeof sheet === 'object' ? sheet : this.getSheet(sheet);
        var merges = ws['!merges'] || (ws['!merges'] = []);
        merges.push(range);
    },
    convertDateToSerial: function JSDateToExcelDate(inDate) {
        // assumes date given is GMT
        if (!(inDate instanceof Date)) inDate = new Date(inDate);
        var returnDateTime = 25569.0 + (inDate.getTime() / (86400000));
        return returnDateTime;
    },
    serialize: function () {
        var self = this;
        var wb = this.getWorkbook();
        var output = assign({}, wb);
        output.SheetNames.forEach(function (name) {
            var ws = wb.Sheets[name];
            if (ws.range.e.r === -1) ws.range.e.r++;
            ws['!ref'] = self.getRangeRef(ws.range);
            output.Sheets[name] = omit(ws, 'range');
        });
        return output;
    },
    generate: function () {
        return XLSX.write(this.serialize(), this.options.xlsx);
    }
});

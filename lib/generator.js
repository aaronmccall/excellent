var assign = require('lodash.assign');
var defaults = require('lodash.defaults');
var omit = require('lodash.omit');
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
    valueTypes: {
        string: 's',
        number: 'n',
        boolean: 'b'
    },
    initOptions: function (options) {
        this.options = options;
        this.options.possibleKeys = this.options.possibleKeys || Object.keys(this.options.headerLabels);
        if (!this.options.possibleKeys.length) console.log('No possibleKeys and/or headerLabels provided!');
    },
    initialize: function () {},
    getOutputKeys: function () {
        var self = this;
        return this._outputKeys || (
            this._outputKeys = this.options.possibleKeys.reduce(function (keys, key) {
                if (self.options.displayOptions[key]) keys.push(key);
                return keys;
            }, [])
        );
    },
    getColumnHeaders: function () {
        var self = this;
        var headers = this.getOutputKeys().map(function (key) {
            var header = {
                v: self.options.headerLabels[key],
                t: self.valueTypes.string
            };
            if (self.styles && self.styles.headerStyle) header.s = self.styles.headerStyle;
            return header;
        });
        // Date is first column
        headers.unshift({v: 'Date', t: this.valueTypes.string, s: this.styles.cellStyles.label});
        return {cells: headers};
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
    getProps: function () {
        return {};
    },
    getSheet: function (sheetName) {
        var wb = this.getWorkbook();
        var ws = wb.Sheets[sheetName || 'Sheet1'];
        if (ws) return ws;
        wb.SheetNames.push(sheetName || 'Sheet1');
        return (wb.Sheets[sheetName || 'Sheet1'] = {
            range: {
                s: {c: 0, r: 0},
                e: {c: 0, r: 0}
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
        var r = range.e.r++;
        row.cells.forEach(function (cell, c) {
            if (range.e.c < c) range.e.c = c;
            var ref = self.getCellRef(r, c);
            ws[ref] = cell;
        });
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
    serialize: function () {
        var self = this;
        var wb = this.getWorkbook();
        var output = assign({}, wb);
        output.SheetNames.forEach(function (name) {
            var ws = wb.Sheets[name];
            ws['!ref'] = self.getRangeRef(ws.range);
            output.Sheets[name] = omit(ws, 'range');
        });
        return output;
    },
    generate: function () {
        return XLSX.write(this.serialize(), this.options.xlsx);
    }
});

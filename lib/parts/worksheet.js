var assign = require('lodash.assign');
var defaults = require('lodash.defaults');
var flow = require('lodash.flow');
var omit = require('lodash.omit');
var partial = require('lodash.partial');
var pick = require('lodash.pick');
var util = require('util');

var Hyperlink = require('./hyperlink');
var Image = require('./image');
var Part = require('./partWithRels');
var templates = require('./templates');
var utilities = require('../utilities');

function Worksheet(parent, sheetData) {
    if (!sheetData || !sheetData.name) {
        throw new TypeError('[Worksheet] sheetData must be an object with a name property');
    }
    this.name = sheetData.name;
    if (sheetData.rows) {
        this.addRows(sheetData.rows)
    }
    this.parent = parent;
    Part.call(this, {
        spreadsheetml: '__main',
        markupCompatibility: 'mc',
        relationships: 'r',
        x14ac: 'x14ac'
    }, templates.worksheet);
};
module.exports = Worksheet;

util.inherits(Worksheet, Part);

assign(Worksheet.prototype, {
    addHyperlink: function(url, ref) {
        this.rels.addHyperlink(new Hyperlink(url, ref));
    },
    addImage: function (imageBuffer, data) {
        var index = this.images.length;
        this.images.push(new Image(imageBuffer, data));
        this.rels.addImage(this.images[index]);
    },
    addMerge: function(ref) {
        this.merges.push(ref);
    },
    addRow: function(row) {
        var self = this;
        if (!row.cells.length) return;
        var range = this.range;
        var r = range.e.r++;
        if (row.cells.length > range.end.col) {
            range.end.col = row.cells.length - 1;
        }
        row.cells.forEach(function(raw, c) {
            var cell = self.makeCell(raw);
            cell.row = r;
            cell.col = c;
            cell.ref = self.getCellRef(cell);
            if (cell.type === 's') {
                var index = this.addString(cell.value);
                cell.value = index;
            }
            if (cell.hyperlink) {
                self.addHyperlink(cell.ref, cell.hyperlink);
            }
        });
        if (row.merges) row.merges.forEach(flow(function(merge) {
            return {
                start: {
                    row: r,
                    col: merge.start
                },
                end: {
                    row: r,
                    col: merge.end
                }
            };
        }, self.getRangeRef, self.addMerge).bind(self));
        this.rows.push(row);
    },
    // Transform allows us to specify how to turn a row of data into cells
    addRows: function(rows, transform) {
        var adder = this.addRow.bind(this);
        var iterator = typeof transform === 'function' ? flow(transform, adder) : adder;
        rows.forEach(iterator);
    },
    addString: function (string) {
        return this.parent.addSharedString(string);
    },
    getCellRef: function(cell) {
        return utilities.encodeCell(cell);
    },
    getRangeRef: function(range, abs) {
        return utilities.encodeRange(range, abs);
    },
    makeCell: function (raw) {
        var type = utilities.smartType(raw);
        var cell = {};
        switch (type) {
            case 'String':
                cell.style = 0;
                cell.type = 's';
                cell.value = raw;
            break;
            case 'Number':
                cell.style = 0;
                cell.value = raw;
            break;
            case 'Boolean':
                cell.style = 0;
                cell.type = 'b';
                cell.value = raw;
            break;
            case 'Object':
                // TODO: differentiate inline from formula cells
            break;
            case 'Array':
                if (raw.every(function (s) {
                    return (typeof s === 'string') || (utilities.isObject(s) && 'style' in s && 'text' in s);
                })) {
                    cell.inline = raw;
                    cell.type = 'inlineStr';
                }
                break;
        }
    },
    setPrintArea: function(range) {
        this.parent.addDefinedName('printArea', this.getRangeRef(range, abs), this);
    },
    setTitleRows: function(rows) {
        var row = ((rows | 0) > 1 ? (rows | 0) : 1);
        var ref = [0, --row].map(partial(utilities.encodeRow, partial.placeholder, true)).join(':')
        this.parent.addDefinedName('titleRows', [this.name, ref].join('!'), this);
    }
});

Object.defineProperties(Worksheet.prototype, assign(
    utilities.writeOnce('name'),
    utilities.makeConstant('type', 'worksheet'),
    utilities.unsettable('dimension', {
        getter: function () { utilities.encodeRange(this.range); }
    }),
    utilities.unsettable('filename', {
        getter: function() { return 'sheet' + (this.id) + '.xml'; }
    }),
    utilities.unsettable('index', {
        getter: function() {
            return this.parent ? this.parent.sheetNames.indexOf(this.name) : 0;
        }
    }),
    utilities.unsettable('id', {
        getter: function() { return ++this.index; }
    }),
    utilities.unsettable('images', { ctor: Array }),
    utilities.unsettable('merges', { ctor: Array }),
    utilities.unsettable('range', {
        getter: function() {
            return this._range || (this._range = {
                start: { col: 0, row: 0 },
                end: { col: 0, row: 0 }
            });
        }
    }),
    utilities.unsettable('rows', { ctor: Array }),
    utilities.unsettable('path', {
        getter: function() {
            return [utilities.dirname(this.parent.path), 'worksheets', this.filename].join('/');
        }
    }),
    utilities.unsettable('data', {
        getter: function() {
            var pickProps = ['dimension', 'footers', 'headers', 'merges', 'rows'];
            return defaults(pick(this, pickProps), this.options.data);
        }
    })
));
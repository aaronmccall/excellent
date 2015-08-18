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
    Part.call(this, {
        spreadsheetml: '__main',
        markupCompatibility: 'mc',
        relationships: 'r',
        x14ac: 'x14ac'
    }, templates.worksheet);

    if (!sheetData || !sheetData.name) {
        throw new TypeError('[Worksheet] sheetData must be an object with a name property');
    }
    this.parent = parent;
    this.name = sheetData.name;
    if (sheetData.rows) {
        this.addRows(sheetData.rows)
    }
};
module.exports = Worksheet;

util.inherits(Worksheet, Part);

assign(Worksheet.prototype, {
    addHyperlink: function(attrs) {
        this.rels.addHyperlink(new Hyperlink(attrs));
    },
    addImage: function (data) {
        this.rels.addDrawing(new Image(data, this));
    },
    addMerge: function(ref) {
        this.merges.push(ref);
    },
    addRow: function(row) {
        if (!row || !row.cells || !row.cells.length) return;
        var self = this;
        var range = this.range;
        var r = range.end.row++;
        if (row.cells.length > range.end.col) {
            range.end.col = row.cells.length - 1;
        }
        var cells = row.cells.map(function(raw, c) {
            var cell = self.makeCell(raw);
            cell.row = r;
            cell.col = c;
            cell.ref = self.getCellRef(cell);
            if (cell.type === 's') {
                var index = self.addString(cell.value);
                cell.value = index;
            }
            if (cell.hyperlink) {
                self.addHyperlink(cell.ref, cell.hyperlink);
            }
            return cell;
        });
        row.cells = cells;

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
                if (!raw.type) {
                    if ('value' in raw && 'String-Boolean'.indexOf(utilities.smartType(raw.value)) !== -1) {
                        raw.type = (typeof raw.value).charAt(0);
                    }
                    if ('inline' in raw) {
                        raw.type = 'inlineStr'
                        raw.inline = raw.inline.map(function (s) {
                            if (typeof s === 'string') {
                                return {text: s};
                            }
                            if (typeof s.style === 'string') {
                                s.style = this.styles.getFont(s.style)
                            }
                            return s;
                        }, this);
                    }
                }
                cell = raw;
            break;
            case 'Array':
                if (raw.every(function (s) {
                    return (typeof s === 'string') || (utilities.isObject(s) && 'style' in s && 'text' in s);
                })) {
                    cell.inline = raw.map(function (s) {
                        var payload = utilities.isObject(s) ? s : {text: s};
                        if (typeof payload.style === 'string') {
                            payload.style = this.styles ? this.styles.getFont(payload.style) : null;
                        }
                        return payload;
                    }, this);
                    cell.type = 'inlineStr';
                }
                break;
        }
        if ('style' in cell && Number(cell.style) != cell.style) {
            cell.style = this.styles ? (this.styles.cellStyleRefs[cell.style] || 0) : 0;
        }
        return cell;
    },
    setPrintArea: function(range) {
        this.parent.addDefinedName('printArea', this.getRangeRef(range, abs), this);
    },
    setTitleRows: function(rows) {
        var row = ((rows | 0) > 1 ? (rows | 0) : 1);
        var ref = [0, row-1].map(partial(utilities.encodeRow, partial.placeholder, true)).join(':')
        this.parent.addDefinedName('titleRows', [this.name, ref].join('!'), this);
    }
});

var ctorArray = { ctor: Array };
Object.defineProperties(Worksheet.prototype, utilities.defineProps({
    constant: {
        type: 'worksheet'
    },
    unsettable: {
        data: {
            getter: function() {
                var pickProps = ['dimension', 'footers', 'headers', 'merges', 'rows'];
                return defaults(pick(this, pickProps), (this.options && this.options.data) || {});
            }
        },
        dimension: {
            getter: function() {
                return utilities.encodeRange(this.range);
            }
        },
        filename: {
            getter: function() {
                return 'sheet' + (this.id) + '.xml';
            }
        },
        id: {
            getter: function() {
                return this.index+1;
            }
        },
        index: {
            getter: function() {
                return this.parent ? this.parent.sheetNames.indexOf(this.name) : 0;
            }
        },
        images: ctorArray,
        merges: ctorArray,
        path: {
            getter: function() {
                return [utilities.dirname(this.parent.path), 'worksheets', this.filename].join('/');
            }
        },
        range: {
            getter: function() {
                return this._range || (this._range = {
                    start: { col: 0, row: 0 },
                    end: { col: 0, row: 0 }
                });
            }
        },
        rows: ctorArray,
        styles: {
            getter: function() {
                return this.parent && this.parent.styles;
            }
        }
    },
    writeOnce: {
        name: 1,
        parent: 1
    }
}));
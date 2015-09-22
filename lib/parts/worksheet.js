var assign = require('lodash.assign');
var defaults = require('lodash.defaults');
var flow = require('lodash.flow');
var omit = require('lodash.omit');
var partial = require('lodash.partial');
var pick = require('lodash.pick');
var util = require('util');
var where = require('lodash.where');

var Hyperlink = require('./hyperlink');
var Image = require('./image');
var Part = require('./partWithRels');
var templates = require('./templates');
var utilities = require('../utilities');

function Worksheet(parent, sheetData, options) {
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
    this.addOptions(options);
    if (sheetData.rows) {
        this.addRows(sheetData.rows)
    }
    if (sheetData.image) this.addImage(sheetData.image);
    if (sheetData.images) {
        sheetData.images.forEach(this.addImage, this);
    }
};
module.exports = Worksheet;

util.inherits(Worksheet, Part);

assign(Worksheet.prototype, {
    addHyperlink: function(attrs) {
        this.rels.addHyperlink(new Hyperlink(this, attrs));
    },
    addImage: function (data) {
        var image = new Image(data, this);
        this.rels.addDrawing(image);
    },
    addMerge: function(ref) {
        this.merges.push(ref);
    },
    addOptions: function (options) {
        if (!utilities.isObject(options)) return;
        assign(this.options, options);
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
            var cell = this.makeCell(raw);
            cell.row = r;
            cell.col = c;
            cell.ref = this.getCellRef(cell);
            if (cell.type === 's') {
                var index = this.addString(cell.value);
                cell.value = index;
            }
            if (cell.hyperlink) {
                cell.hyperlink.ref = cell.ref;
                this.addHyperlink(cell.hyperlink);
            }
            return this.transformCell(cell);
        }, this);
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
        this.rows.push(this.transformRow(row));
    },
    // Transform allows us to specify how to turn a row of data into cells
    addRows: function(rows) {
        rows.forEach(this.addRow, this);
    },
    addString: function (string) {
        return this.parent.addSharedString(string);
    },
    convertDateToSerial: utilities.convertDateToSerial,
    getCellRef: function(cell) {
        return utilities.encodeCell(cell);
    },
    getRangeRef: function(range, abs) {
        return utilities.encodeRange(range, abs);
    },
    makeCell: function (raw) {
        var type = utilities.smartType(raw);
        var cell = {};
        var useShared = this.options.useSharedStrings !== false;
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
                cell = raw;
                if (!cell.type) {
                    if ('value' in cell && 'String-Boolean'.indexOf(utilities.smartType(cell.value)) !== -1) {
                        cell.type = (typeof cell.value).charAt(0);
                    } else if (utilities.isArray(cell.value)) {
                        cell.type = useShared ? 's' : 'inlineStr';
                        cell[useShared ? 'value' : 'inline'] = cell.value.map(function (s) {
                            if (typeof s === 'string') {
                                return {text: s};
                            }
                            if (typeof s.style === 'string') {
                                s.style = this.styles.getFont(s.style)
                            }
                            return s;
                        }, this);
                        if (cell.inline && 'value' in cell) delete cell.value;
                    }
                }
            break;
            case 'Array':
                if (raw.every(function (s) {
                    return (typeof s === 'string') || (utilities.isObject(s) && 'text' in s);
                })) {
                    cell[useShared ? 'value' : 'inline'] = raw.map(function (s) {
                        var payload = utilities.isObject(s) ? s : {text: s};
                        if (typeof payload.style === 'string') {
                            payload.style = this.styles ? this.styles.getFont(payload.style) : null;
                        }
                        return payload;
                    }, this);
                    cell.type = useShared ? 's' : 'inlineStr';
                }
                break;
        }
        if ('style' in cell && Number(cell.style) != cell.style) {
            cell.style = this.styles ? (this.styles.cellStyleRefs[cell.style] || 0) : 0;
        }
        return cell;
    },
    safeName: function (name) {
        name = name || this.name;
        return name.indexOf(' ') !== -1 ? "'" + name + "'" : name;
    },
    setPrintArea: function(range) {
        this.parent.addDefinedName('printArea', this.getRangeRef(range, abs), this);
    },
    setTitleRows: function(rows, freeze) {
        var row = ((rows | 0) > 1 ? (rows | 0) : 1);
        var ref = [0, row-1].map(partial(utilities.encodeRow, partial.placeholder, true)).join(':')
        this.parent.addDefinedName('titleRows', [this.safeName(), ref].join('!'), this);
        if (freeze) {
            this.panes.push({
                activePane: 'bottomLeft',
                state: 'frozen',
                topLeftCell: this.getCellRef({row: rows, col: 0}),
                ySplit: rows
            });
        }
    },
    transformRow: function (rowData) {
        return rowData;
    },
    transformCell: function (cellData) {
        return cellData;
    }
});

var ctorArray = { ctor: Array };
Object.defineProperties(Worksheet.prototype, utilities.defineProps({
    constant: {
        pickAttrs: ['columns', 'dimension', 'footers', 'headers', 'images', 'merges', 'pageMargins', 'pageSetup', 'panes', 'rows', 'selection', 'tabSelected'],
        type: 'worksheet'
    },
    unsettable: {
        columns: ctorArray,
        data: {
            getter: function() {
                var picked = pick(this, this.pickAttrs);
                assign(picked, {
                    hyperlinks: where(this.rels.parts, {type: 'hyperlink'}).map(function (hyperlink) {
                        return assign({id: 'rId' + hyperlink.part.id}, omit(hyperlink, 'part'), pick(hyperlink.part, hyperlink.part.attrList));
                    }),
                    drawings: where(this.rels.parts, {type: 'drawing'}).map(function (drawing) {
                        return {rId: 'rId' + drawing.part.id};
                    })
                });
                return defaults(picked, (this.options && this.options.data) || {});
            }
        },
        dimension: {
            getter: function() {
                if (this.range.end.row === this.rows.length) {
                    this.range.end.row--;
                }
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
        merges: ctorArray,
        options: {ctor: Object},
        panes: ctorArray,
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
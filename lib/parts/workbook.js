var assign = require('lodash.assign');
var each = require('lodash.foreach');
var mapKeys = require('lodash.mapkeys');
var util = require('util');

var definedNames = require('../definitions/definedNames');
var templates = require('./templates');
var utilities = require('../utilities');
var Part = require('./partWithRels');
var Styles = require('./styles');
var Worksheet = require('./worksheet');
var SharedStrings = require('./sharedStrings');

function Workbook(data) {
    this.initialize(data);
    Part.call(this, {
        spreadsheetml: '__main',
        relationships: 'r'
    }, templates.workbook);
};

util.inherits(Workbook, Part);

module.exports = Workbook;

assign(Workbook.prototype, {
    initialize: function (data) {
        var haveData = utilities.isObject(data);
        if (haveData && data.styles) {
            this.addStyles(data.styles);
        }
        if (haveData && data.sheets) {
            this.addSheets(data.sheets);
        }
    },
    addDefinedName: function (name, value, sheet) {
        this.definedNames[name] = {value: value, id: sheet.id};
    },
    addSharedString: function (string) {
        return this.sharedStrings.add(string);
    },
    addSheets: function (sheets) {
        each(sheets, function (sheet, n) {
            if (utilities.isObject(sheet) && typeof n === 'string') {
                sheet.name = n;
                this.addSheet(sheet);
            } else if (Array.isArray(sheet)) {
                this.addSheet(n, sheet);
            }
        }, this);
    },
    addSheet: function(nameOrData, rows) {
        var payload;
        // if first arg is an object, assume it's a sheet data object
        if (utilities.isObject(nameOrData)) payload = nameOrData;
        // if not, it's likely a name
        if (!payload) payload = {name: nameOrData};
        // if it turns out to be neither, set the name automatically
        if (!payload.name || typeof payload.name !== 'string') {
            payload.name = 'Sheet' + this.sheets.length;
        }
        // If second arg is an array, set it as rows.
        if (utilities.isArray(rows)) payload.rows = rows;
        var sheet = new Worksheet(this, payload);
        this.sheets.push(sheet);
        this.sheetNames.push(sheet.name);
        this.rels.addWorksheet(sheet);
        return sheet;
    },
    addStyles: function (styleData) {
        this._styles = new Styles(styleData, this);
        this.rels.addStyles(this._styles);
    },
    getSheet: function(name) {
        return this.sheets[this.sheetNames.indexOf(name)];
    }
});

Object.defineProperties(Workbook.prototype, utilities.defineProps({
    constant: {
        type: 'officeDocument',
        filename: 'workbook.xml'
    },
    unsettable: {
        data: {
            getter: function() {
                var self = this;
                return {
                    sheets: this.rels.worksheet.map(function(rel) {
                        return {
                            name: rel.part.name,
                            rId: rel.rId,
                            id: rel.part.id,
                            target: rel.part.path.replace(utilities.dirname(self.path), '').slice(1)
                        };
                    }),
                    definedNames: mapKeys(this.definedNames, function(val, key) {
                        return definedNames[key] || key;
                    })
                };
            }
        },
        definedNames: { ctor: Object },
        path: {
            getter: function() { return ['xl', this.filename].join('/'); }
        },
        sharedStrings: {
            getter: function() {
                if (this._sharedStrings) return this._sharedStrings;
                this._sharedStrings = new SharedStrings(this);
                this.rels.addSharedStrings(this._sharedStrings);
                return this._sharedStrings;
            }
        },
        sheets: { ctor: Array },
        sheetNames: { ctor: Array },
        styles: {
            getter: function() {
                if (this._styles) return this._styles;
                this._styles = new Styles();
                this.rels.addStyles(this._styles);
                return this._styles;
            }
        }
    }
}));
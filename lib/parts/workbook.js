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

function Workbook(data, options) {
    this.initialize(data, options);
    Part.call(this, {
        spreadsheetml: '__main',
        relationships: 'r'
    }, templates.workbook);
};

util.inherits(Workbook, Part);

module.exports = Workbook;

assign(Workbook.prototype, {
    sheetConstructor: Worksheet,
    initialize: function (data, options) {
        this.addOptions(options);
        if (this.options.sheetConstructor) this.sheetConstructor = this.options.sheetConstructor;
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
            var hasName = typeof n === 'string';
            if (utilities.isObject(sheet)) {
                if (hasName) sheet.name = n;
                this.addSheet(sheet);
            } else if (Array.isArray(sheet)) {
                var payload = {rows: sheet};
                if (hasName) payload.name = n;
                this.addSheet(payload);
            }
        }, this);
    },
    addSheet: function(sheetData) {
        // if it turns out to be neither, set the name automatically
        if (!sheetData.name || typeof sheetData.name !== 'string') {
            sheetData.name = 'Sheet' + this.sheets.length;
        }
        // If second arg is an array, set it as rows.
        var sheet = new this.sheetConstructor(this, sheetData, assign({}, this.options));
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
    },
    addOptions: function (options) {
        assign(this.options, options || {});
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
                    hasDefinedNames: !!Object.keys(this.definedNames).length,
                    definedNames: mapKeys(this.definedNames, function(val, key) {
                        return definedNames[key] || key;
                    })
                };
            }
        },
        definedNames: { ctor: Object },
        options: { ctor: Object },
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
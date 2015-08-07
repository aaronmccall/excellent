var assign = require('lodash.assign');
var defaults = require('lodash.defaults');
var each = require('lodash.foreach');
var flatten = require('lodash.flatten');
var mapKeys = require('lodash.mapkeys');
var util = require('util');

var definedNames = require('../definitions/definedNames');
var templates = require('./templates');
var utilities = require('../utilities');
var Part = require('./partWithRels');
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
        if (haveData && data.sheets) {
            this.addSheets(data.sheets);
        }
        if (haveData && data.styles) {
            this.addStyles(data.styles);
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
        if (Array.isArray(rows)) payload.rows = rows;
        var sheet = new Worksheet(this, payload);
        this.sheets.push(sheet);
        this.sheetNames.push(sheet.name);
        this.rels.addWorksheet(sheet);
        return sheet;
    },
    getSheet: function(name) {
        return this.sheets[this.sheetNames.indexOf(name)];
    }
});

Object.defineProperties(Workbook.prototype, assign(
    utilities.makeConstant('type', 'officeDocument'),
    utilities.makeConstant('filename', 'workbook.xml'),
    utilities.unsettable('data', {
        getter: function() {
            var self = this;
            return {
                sheets: this.rels.data
                    .filter(function(rel) {
                        return rel.type === 'worksheet';
                    })
                    .map(function(rel) {
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
    }),
    utilities.unsettable('definedNames', { ctor: Object }),
    utilities.unsettable('path', {
        getter: function() { return ['xl', this.filename].join('/'); }
    }),
    utilities.unsettable('sharedStrings', {
        getter: function() {
            if (this._sharedStrings) return this._sharedStrings;
            this._sharedStrings = new SharedStrings();
            this.rels.addSharedStrings(this._sharedStrings);
            return this._sharedStrings;
        }
    }),
    utilities.unsettable('sheets', { ctor: Array }),
    utilities.unsettable('sheetNames', { ctor: Array })
));
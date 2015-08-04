var assign = require('lodash.assign');
var defaults = require('lodash.defaults');
var flatten = require('lodash.flatten');
var util = require('util');

var templates = require('./templates');
var utilities = require('../utilities');
var Worksheet = require('./worksheet');
var Part = require('./part');

function Workbook() {
    Part.call(this, {spreadsheetml: '__main', relationships: 'r'}, templates.workbook);
};

util.inherits(Workbook, Part);

module.exports = Workbook;

assign(Workbook.prototype, {
    addSheet: function (name) {
        var sheet = new Worksheet(name || 'Sheet' + this.sheets.length);
        sheet.parent = this;
        this.sheets.push(sheet);
        this.sheetNames.push(sheet.name);
        return sheet;
    }
});

Object.defineProperties(Workbook.prototype, assign(
    utilities.makeConstant('type', 'officeDocument'),
    utilities.makeConstant('path', 'xl/workbook.xml'),
    utilities.unsettable('data', function () {
        return {
            sheets: this.rels.serialize().filter(function (rel) {
                return !!~rel.type.indexOf('worksheet')
            }).map(function (rel) {
                return {
                    name: rel.part.name,
                    rId: rel.rId,
                    id: rel.part.id,
                    definedNames: rel.part.definedNames
                };
            }),
            hasDefinedNames: this.sheets.some(function (sheet) { return !!sheet.definedNames.length; });
        };
    }),
    utilities.unsettable('sheets', function () { return this._sheets || (this._sheets = []); }),
    utilities.unsettable('sheetNames', function () { return this._sheetNames || (this._sheetNames = []); })
));

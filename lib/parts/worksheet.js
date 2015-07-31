var assign = require('lodash.assign');
var defaults = require('lodash.defaults');
var pick = require('lodash.pick');
var util = require('util');

var templates = require('./templates');
var Part = require('./part');
var Hyperlink = require('./hyperlink');

module.exports = function Worksheet(name, options) {
    this.name = name;
    this.options = options;
    Part.call(this, {
        spreadsheetml: '__main',
        markupCompatibility: 'mc',
        relationships: 'r',
        x14ac: 'x14ac'
    }, templates.worksheet);
};

util.inherits(Worksheet, Part);

assign(Worksheet.prototype, {
    addHyperlink: function (url, ref) {
        this.rels.add(new Hyperlink(url, ref));
    },
    setTitleRows: function (rows) {
        this.definedNames.push({name: '_xlnm.Print_Titles', value: this.name + '!$1:$' + ((rows|0) > 1 ? rows : 1)})
    }
});

Object.defineProperties(Rels.prototype, {},
    utilities.makeConstant('type', 'worksheet'),
    utilities.unsettable('definedNames', function () {
        return this._definedNames || (this._definedNames = []); 
    }),
    utilities.unsettable('dimension', function () {
        utilities.encodeRange(this.range);
    }),
    utilities.unsettable('filename', function () {
        return 'sheet' + (this.id);
    }),
    utilities.unsettable('index', function () {
        return this.parent.sheets.indexOf(this);
    }),
    utilities.unsettable('id', function () {
        return ++this.index;
    }),
    utilities.unsettable('merges', function () {
        return this._merges || (this._merges = []); 
    }),
    utilities.unsettable('range', function () {
        return this._range || (this._range = {
            start: {col: 0, row: 0},
            end: {col: 0, row: 0}
        });
    }),
    utilities.unsettable('rels', function () {
        return this._rels || (this._rels = []);
    }),
    utilities.unsettable('rows', function () {
        return this._rows || (this._rows = []);
    }),
    utilities.unsettable('path', function () {
        return utilities.dirname(this.parent.path) + '/worksheets/' + this.filename + '.xml';
    }),
    utilities.unsettable('data', function () {
        var pickProps = ['dimension', 'footers', 'headers', 'merges', 'rows', 'data'];
        return defaults(pick(this, pickProps), this.options);
    })
);

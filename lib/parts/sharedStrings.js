var assign = require('lodash.assign');
var isEqual = require('lodash.isequal');
var util = require('util');
var uuid = require('node-uuid');

var Part = require('./part');
var templates = require('./templates');
var utilities = require('../utilities');

function SharedStrings() {
    Part.call(this, {spreadsheetml: '__main'}, templates.sharedStrings);
};
module.exports = SharedStrings;
util.inherits(SharedStrings, Part);

assign(SharedStrings.prototype, {
    add: function (raw) {
        this.count++;
        if (utilities.isObject(raw)) {
            this.addRich(raw);
        }
        var str = raw || '';
        var s = this.stringMap[str];
        if (s !== undefined ) {
            return s;
        }

        var index = this.strings.length;
        this.strings.push(str);
        return (this.stringMap[str] = index);
    }
});

Object.defineProperties(SharedStrings.prototype, assign(
    {
        count: {
            get: function () { return ('_count' in this) ? this._count : (this._count = 0); },
            set: function (val) { this._count = val; }
        }
    },
    utilities.unsettable('rich', {ctor: Array}),
    utilities.unsettable('strings', {ctor: Array}),
    utilities.unsettable('stringMap', {ctor: Object})
));
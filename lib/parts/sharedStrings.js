var assign = require('lodash.assign');
var isEqual = require('lodash.isequal');
var pick = require('lodash.pick');
var util = require('util');
var uuid = require('node-uuid');

var Part = require('./part');
var templates = require('./templates');
var utilities = require('../utilities');

function SharedStrings(parent) {
    Part.call(this, {spreadsheetml: '__main'}, templates.sharedStrings);
    this.parent = parent;
};
module.exports = SharedStrings;
util.inherits(SharedStrings, Part);

assign(SharedStrings.prototype, {
    add: function (raw) {
        this.count++;
        var str = String(raw || '');
        var s = this.stringMap[str];
        if (s !== undefined ) {
            return s;
        }

        var index = this.strings.length;
        this.strings.push(str);
        return (this.stringMap[str] = index);
    }
});

Object.defineProperties(SharedStrings.prototype, utilities.defineProps({
    constant: {
        filename: 'sharedStrings.xml'
    },
    unsettable: {
        data: {
            getter: function () {
                return pick(this, 'count', 'strings');
            }
        },
        path: {
            getter: function () {
                var path = this.parent ? utilities.dirname(this.parent.path) : '';
                return path ? path + '/' + this.filename : this.filename;
            },
        },
        strings: { ctor: Array },
        stringMap: { ctor: Object }
    }
},
{
    count: {
        get: function () { return ('_count' in this) ? this._count : (this._count = 0); },
        set: function (val) { this._count = val; }
    }
}));
var assign = require('lodash.assign');
var isEqual = require('lodash.isequal');
var pick = require('lodash.pick');
var uuid = require('uuid');
var util = require('util');

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
        if (utilities.isArray(raw)) {
            return this.addRich(raw);
        }
        this.count++;
        var str = String(raw || '');
        var s = this.stringMap[str];
        if (s !== undefined ) {
            return s;
        }

        var index = this.strings.length;
        this.strings.push(str);
        return (this.stringMap[str] = index);
    },
    addRich: function (parts) {
        this.count++;
        var match;
        this.rich.forEach(function (p) {
            match = isEqual(parts, p.parts) ? p : void 0;
        });
        if (match) {
            return this.stringMap[match.id];
        }
        var rich = {parts: parts, id: uuid.v4()};
        var index = this.strings.length;
        this.rich.push(rich);
        this.strings.push(parts);
        return (this.stringMap[rich.id] = index);
    }
});

Object.defineProperties(SharedStrings.prototype, utilities.defineProps({
    constant: {
        filename: 'sharedStrings.xml',
        type: 'sharedStrings'
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
                return path ? (path + '/' + this.filename) : this.filename;
            },
        },
        rich: { ctor: Array },
        strings: { ctor: Array },
        stringMap: { ctor: Object }
    },
    writeOnce: {
        parent: 1
    }
},
{
    count: {
        get: function () { return ('_count' in this) ? this._count : (this._count = 0); },
        set: function (val) { this._count = val; }
    }
}));
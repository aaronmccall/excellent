var assign = require('lodash.assign');
var each = require('lodash.foreach');
var findWhere = require('lodash.findwhere');
var mapValues = require('lodash.mapvalues');
var partial = require('lodash.partial');
var util = require("util");

var Part = require('./part');
var relationships = require('../definitions/relationships');
var templates = require('./templates');
var utilities = require('../utilities');

function Rels(parent) {
    Part.call(this, {
        relationships: '__main'
    }, templates.rels);
    this.parent = parent;
}
util.inherits(Rels, Part);
module.exports = Rels;

var methods = {
    addRel: function(type, part) {
        if (utilities.isObject(type) && !part) {
            part = type;
            type = part.type;
        }
        if (!part) throw new TypeError('addRel must be called with a part');
        if (!type) throw new TypeError('addRel must be called with a type or part must have a type property.');
        this.parts.push({
            type: type,
            part: part
        });
    },
    getId: function (part) {
        return this.parts.indexOf(findWhere(this.parts, {part: part})) + 1;
    }
};

each(relationships, function(rel, type) {
    methods['add' + utilities.upperFirst(type)] = partial(methods.addRel, type);
});

assign(Rels.prototype, methods);

Object.defineProperties(Rels.prototype, utilities.defineProps({
    constant: { type: 'relationship' },
    unsettable: assign({
        path: {
            getter: function() {
                return [
                    utilities.dirname(this.parent.path),
                    '_rels',
                    this.parent.filename + '.rels'
                ].filter(function (part) { return part; }).join('/')
            }
        },
        parts: { ctor: Array },
        data: {
            getter: function() {
                return this.parts.map(function(part, i) {
                    return {
                        rId: 'rId' + (++i),
                        type: relationships[part.type] || part.type,
                        target: part.part.path,
                        targetMode: part.targetMode,
                        part: part.part
                    };
                });
            }
        }
    }, mapValues(relationships, function (_, type) {
        return {
            getter: function () {
                return this.data.filter(function (rel) {
                    return rel.type === relationships[type] || rel.type === type;
                });
            }
        };
    }))
}));
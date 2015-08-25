var assign = require('lodash.assign');
var each = require('lodash.foreach');
var findWhere = require('lodash.findwhere');
var mapValues = require('lodash.mapvalues');
var partial = require('lodash.partial');
var path = require('path');
var util = require("util");

var Part = require('./part');
var relationships = require('../definitions/relationships');
var templates = require('./templates');
var utilities = require('../utilities');

function Rels(parent) {
    this.parent = parent;
    Part.call(this, {
        relationshipsMain: '__main'
    }, templates.rels);
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
    },
    getRelativePath: function (part) {
        var parent = part.parent && part.parent.path;
        if (!parent) {
            parent = this.parent && this.parent.path;
        }
        if (parent) {
            return path.relative('/' + utilities.dirname(parent), '/' + part.path);
        }
        return part.path;
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
                var self = this;
                return {
                    rels: this.parts.map(function(rel, i) {
                        return {
                            rId: 'rId' + (++i),
                            type: relationships[rel.type] || rel.type,
                            target: (rel.part.path && !rel.part.targetMode) ? self.getRelativePath(rel.part) : rel.part.path,
                            targetMode: rel.part.targetMode,
                            part: rel.part
                        };
                    })
                };
            }
        }
    }, mapValues(relationships, function (_, type) {
        return {
            getter: function () {
                return this.data.rels.filter(function (rel) {
                    return rel.type === relationships[type] || rel.type === type;
                });
            }
        };
    }))
}));
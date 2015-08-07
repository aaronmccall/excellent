var assign = require('lodash.assign');
var each = require('lodash.foreach');
var findWhere = require('lodash.findwhere');
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
        this.parts.push({
            type: type,
            part: part
        });
    },
    getId: function (part) {
        return this.parts.indexOf(findwhere(this.parts, {part: part})) + 1;
    }
};

each(relationships, function(rel, type) {
    methods['add' + utilities.upperFirst(type)] = partial(methods.addRel, type);
});

assign(Rels.prototype, methods);

Object.defineProperties(Rels.prototype, assign(
    utilities.makeConstant('type', 'relationship'),
    utilities.unsettable('path', {
        getter: function() {
            return [
                utilities.dirname(this.parent.path),
                '_rels',
                this.parent.filename + '.rels'
            ].filter(function (part) { return part; }).join('/')
        }
    }),
    utilities.unsettable('parts', { ctor: Array }),
    utilities.unsettable('data', {
        getter: function() {
            return this.parts.map(function(part, i) {
                return {
                    rId: 'rId' + (++i),
                    type: (part.type.indexOf('http') === 0) ? part.type : relationships[part.type],
                    target: part.path,
                    targetMode: part.targetMode,
                    part: part
                };
            });
        }
    })
));
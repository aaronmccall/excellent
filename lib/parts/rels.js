var assign = require('lodash.assign');
var camelcase = require('camelcase');
var each = require('lodash.foreach');
var partial = require('lodash.partial');
var util = require("util");

var Part = require('./part');
var relationships = require('../definitions/relationships');
var templates = require('./templates');
var utilities = require('../utilities');

function Rels(parent) {
    this.parent = parent;
    Part.call(this, { relationships: '__main' }, templates.rels);
}
util.inherits(Rels, Part);
module.exports = Rels;

var methods = {
    addRel: function (part) {
        this.rels.push(part);
    },
    serialize: function () {
        var payload = Part.prototype.serialize.call(this);
        payload.rels = ;
    }
};

each(relationships, function (rel, type) {
    methods[camelcase('add', type)] = partial(methods.addRel, type);
});

assign(Rels.prototype, methods);

Object.defineProperties(Rels.prototype, {},
    utilities.makeConstant('type', 'relationship'),
    utilities.makeConstant('path', '{{PARENT_DIRNAME}}/_rels/{{PARENT_FILENAME}}.rels'),
    utilities.unsettable('rels', function () { return this._rels || (this._rels = []); }),
    utilities.unsettable('data', function () {
        return {
            rels: this.rels.map(function (part, i) {
                return {
                    rId: 'rId' + (++i),
                    type: (part.type.indexOf('http') === 0) ? part.type : relationships[part.type],
                    target: part.path,
                    targetMode: part.targetMode,
                    part: part
                };
            })
        }; 
    })
);

var assign = require('lodash.assign');
var namespaces = require('../definitions/namespaces');

var Rels = require('./rels');
var utilities = require('../utilities');

function Part(namespaceSpec, template) {
    this.namespaceSpec = namespaceSpec;
    this.template = template;
};

assign(Part.prototype, {
    serialize: function() {
        return assign({
            // default namespaces for this document
            namespaces: namespaces.getAttributes(this.namespaceSpec),
            // pass the namespace module in case child elements also define namespaces
            ns: namespaces
        }, this.data || {});
    },
    toXML: function() {
        return this.template(this.serialize())
    }
});

Object.defineProperties(
    Part.prototype,
    utilities.unsettable('rels', function () { return this._rels || (this._rels = new Rels(this)); })
);

module.exports = Part;

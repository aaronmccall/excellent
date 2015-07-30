var assign = require('lodash.assign');
var namespaces = require('../definitions/namespaces');

function XML(namespaceSpec, template) {
    this.namespaceSpec = namespaceSpec;
    this.template = template;
};

XML.prototype.serialize = function() {
    return assign({
        // default namespaces for this document
        namespaces: namespaces.getAttributes(this.namespaceSpec),
        // pass the namespace module in case child elements also define namespaces
        ns: namespaces
    }, this.data || {});
};

XML.prototype.toXML = function() {
    return this.template(this.serialize())
};

module.exports = XML;

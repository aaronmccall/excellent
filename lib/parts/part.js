var assign = require('lodash.assign');
var namespaces = require('../definitions/namespaces');

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
        return typeof this.template === 'function' ? this.template(this.serialize()) : this.template;
    }
});

module.exports = Part;

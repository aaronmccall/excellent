var assign = require('lodash.assign');
var merge = require('lodash.merge');
var util = require('util');

var Part = require('./partWithRels');
var templates = require('./templates');
var utilities = require('../utilities');

function CoreProperties(data) {
    if (data) this.addData(data);
    Part.call(this, ['cp', 'dc', 'dcmitype', 'dcterms', 'xsi'], templates.coreProperties)
}

module.exports = CoreProperties;
util.inherits(CoreProperties, Part);

assign(CoreProperties.prototype, {
    addData: function (data) {
        merge(this.data, data || {}, function (tgt, src) {
            if (utilities.isArray(tgt)) {
                tgt.push.apply(tgt, utilities.isArray(src) ? src : [src]);
                return tgt;
            }
        });
    }
})

Object.defineProperties(CoreProperties.prototype, utilities.defineProps({
    constant: {
        path: 'docProps/core.xml',
        type: 'coreProperties'
    },
    unsettable: {
        data: {ctor: Object}
    }
}));
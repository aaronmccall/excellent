var assign = require('lodash.assign');
var utilities = require('../utilities');

function Hyperlink(url, ref) {
    this.path = url;
    this.ref = ref;
}

module.exports = Hyperlink;

Object.defineProperties(Hyperlink.prototype, assign(
    utilities.makeConstant('type', 'hyperlink'),
    utilities.makeConstant('targetMode', 'External')
));
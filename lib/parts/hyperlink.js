var assign = require('lodash.assign');
var pick = require('lodash.pick');
var utilities = require('../utilities');

function Hyperlink(attrs) {
    this.validate(attrs);
    assign(this, pick(attrs, this.attrList));
}
module.exports = Hyperlink;

assign(Hyperlink.prototype, {
    validate: function (attrs) {
        if (!utilities.isObject(attrs)) throw new TypeError('Hyperlink must be instantiated with an attrs object');
        var msgList = [];
        if (!attrs.ref) msgList.push('Missing attrs.ref.');
        if (!attrs.url && !attrs.location) msgList.push('Missing attrs.url and attrs.location. One must be specified.');
        if (msgList.length) {
            msgList.unshift('Hyperlink instantiation attrs errors:');
            throw new TypeError(msgList.map(function (msg, i) {
                return i ? (i + ': ' + msg) : msg;
            }).join('\n'));
        }
    }
});

Object.defineProperties(Hyperlink.prototype, assign(
    utilities.makeConstant('type', 'hyperlink'),
    utilities.makeConstant('targetMode', 'External'),
    utilities.makeConstant('attrList', ['location', 'ref', 'tooltip', 'url']),
    utilities.unsettable('path', { getter: function () { return this.url; } }),
    utilities.writeOnce('location'),
    utilities.writeOnce('ref'),
    utilities.writeOnce('tooltip'),
    utilities.writeOnce('url')
));
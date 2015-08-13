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

Object.defineProperties(Hyperlink.prototype, utilities.defineProps({
    constant: {
        type: 'hyperlink',
        targetMode: 'External',
        attrList: ['location', 'ref', 'tooltip', 'url']
    },
    unsettable: {
        path: { getter: function () { return this.url; } }
    },
    writeOnce: {
        location: 1,
        ref: 1,
        tooltip: 1,
        url: 1
    }
}));
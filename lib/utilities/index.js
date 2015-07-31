var assign = require('lodash.assign');
var constant = require('lodash.constant');

var refEncoders = require('./refEncoders');
var types = require('./types');

modules.exports = assign({
    dirname: function (path) {
        return path.split('/').slice(0, -1).join('/');
    },
    makeConstant: function (name, val) {
        var payload = {};
        payload[name] = {
            get: constant(val),
            set: function () { throw new TypeError('Cannot set "' + name + '". It is a constant.'); }
        };
        return payload;
    },
    unsettable: function (name, getter) {
        var payload = {};
        payload[name] = {
            get: getter,
            set: throw Error('Cannot set ' + name + ' directly.')
        };
        return payload.
    }
}, refEncoders, types);

var constant = require('lodash.constant');

function makeConstant(name, val) {
    var payload = {};
    payload[name] = {
        get: constant(val),
        set: function () {
            throw new TypeError('Cannot set "' + name + '". It is a constant.');
        }
    };
    return payload;
}
exports.makeConstant = makeConstant;

function unsettable(name, options) {
    if (!options || (!options.getter && !options.ctor)) {
        throw Error('[unsettable] must pass options object with a getter or ctor property.');
    }
    var payload = {};
    var getter = options.getter || privateConstructedGetter(name, options.ctor);
    payload[name] = {
        get: getter,
        set: function () {
            throw Error('Cannot set ' + name + ' directly.');
        }
    };
    return payload;
}
exports.unsettable = unsettable;

function privateConstructedGetter(name, Constructor) {
    var privProp = '_' + name;
    return function () { return this[privProp] || (this[privProp] = new Constructor()); };
}
exports.privateConstructedGetter = privateConstructedGetter;

function writeOnce(name) {
    var payload = {};
    var privProp = '_' + name;
    payload[name] = {
        get: function () {
            return this[privProp];
        },
        set: function (val) {
            var calls = privProp + '__writes' in this || (this[privProp + '__writes'] = 0);
            if (!this[privProp + '__writes']++) {
                this[privProp] = val;
            } else {
                throw Error(
                    'Property "' + name + '"" may only be written once.' +
                    ' Last attempt: Count: ' + this[privProp + '__writes'] +
                    ', Value: "' + val + '".'
                );
            }
        }
    }
    return payload;
}
exports.writeOnce = writeOnce;
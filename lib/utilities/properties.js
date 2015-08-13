var assign = require('lodash.assign');
var makeConstant = require('lodash.constant');
var each = require('lodash.foreach');
var types = require('./types');

function constant(name, val) {
    var props;
    if (types.isObject(name)) {
        props = name;
    } else {
        (props = {})[name] = val;
    }
    var payload = {};
    each(props, function (val, name) {
        payload[name] = {
            get: makeConstant(val),
            set: function () {
                throw new TypeError('Cannot set "' + name + '". It is a constant.');
            }
        };
    });
    return payload;
}
exports.constant = constant;

function unsettable(name, options) {
    var props;
    if (types.isObject(name)) {
        props = name;
    } else {
        (props = {})[name] = options;
    }
    var payload = {};
    each(props, function (options, name) {
        if (!options || (!options.getter && !options.ctor)) {
            throw Error('[unsettable] must pass options object with a getter or ctor property.');
        }
        var getter = options.getter || privateConstructedGetter(name, options.ctor);
        payload[name] = {
            get: getter,
            set: function () {
                throw Error('Cannot set ' + name + ' directly.');
            }
        };
    });
    return payload;
}
exports.unsettable = unsettable;

function privateConstructedGetter(name, Constructor) {
    var privProp = '_' + name;
    return function () { return this[privProp] || (this[privProp] = new Constructor()); };
}
exports.privateConstructedGetter = privateConstructedGetter;

function writeOnce(name, options) {
    var props;
    if (types.isObject(name)) {
        props = name;
    } else {
        (props = {})[name] = options;
    }
    var payload = {};
    each(props, function (options, name) {
        var privProp = '_' + name;
        payload[name] = {
            get: (options && options.getter) || function () {
                return this[privProp];
            },
            set: function (val) {
                var calls = privProp + '__writes' in this || (this[privProp + '__writes'] = 0);
                if (!this[privProp + '__writes']++) {
                    if (options && options.setter) return options.setter.call(this, val);
                    this[privProp] = val;
                } else {
                    throw Error(
                        'Property "' + name + '"" may only be written once.' +
                        ' Last attempt: Count: ' + this[privProp + '__writes'] +
                        ', Value: "' + val + '".'
                    );
                }
            }
        };
    });
    return payload;
}
exports.writeOnce = writeOnce;

function defineProps(propDefs, custom) {
    if (!types.isObject(propDefs)) {
        throw new TypeError('propDefs must be an object');
    }
    var payload = {};
    each(['constant', 'unsettable', 'writeOnce'], function (key) {
        assign(payload, exports[key](propDefs[key]));
    })
    return assign(payload, custom || {});
}
exports.defineProps = defineProps;
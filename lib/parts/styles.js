var assign = require('lodash.assign');
var each = require('lodash.foreach');
var mapValues = require('lodash.mapvalues');
var util = require('util');

var Part = require('./part');
var styleDefs = require('../definitions/styles');
var templates = require('./templates');
var utilities = require('../utilities');

var directives = { borders: 1, fonts: 1, fills: 1, numberFormats: 1 };

function Styles(config, parent) {
    this.parse(config);
    this.parent = parent;
    Part.call(this, {
        spreadsheetml: '__main',
        markupCompatibility: 'mc',
        x14ac: 'x14ac'
    }, templates.styles);
}
module.exports = Styles;
util.inherits(Styles, Part);

assign(Styles.prototype, {
    addDirective: function (type, config) {
        var container = this[type];
        if (!container) return;
        var index = container.length;
        container.push(config);
        var refs = this[type.replace(/s$/, '') + 'Refs'];
        refs[config.label] = index;
    },
    addCellStyle: function (config) {
        this.addDirective('cellStyles', mapValues(config, function (val, key) {
            if (typeof val === 'string') {
                var refs = this[key + 'sRefs'];
                if (!refs) return 0;
                return refs[val];
            }
            return val;
        }, this));
    },
    parse: function (config, ) {
        each(config, function (conf, type) {
            if (directives[type]) {
                each(conf, this.addDirective.bind(this, type))
            }
        });
        if (config.cellStyles) {
            each(config.cellStyles, this.addCellStyle, this);
        }
    }
});


var ctorArray = {ctor: Array};
var ctorObject = {ctor: Object};

Object.defineProperties(Styles.prototype, utilities.defineProperties({
    constant: { 'type': 'styles' },
    unsettable: {
        borderRefs: ctorObject,
        borders: ctorArray,
        cellStyleRefs: ctorObject,
        cellStyles: ctorArray,
        data: {
            getter: function () {
                
            }
        },
        fillRefs: ctorObject,
        fills: ctorArray,
        fontRefs: ctorObject,
        fonts: ctorArray,
        numberFormatRefs: ctorObject
        numberFormats: ctorArray,
    }
}));
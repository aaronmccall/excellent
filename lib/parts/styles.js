var assign = require('lodash.assign');
var each = require('lodash.foreach');
var mapValues = require('lodash.mapvalues');
var pick = require('lodash.pick');
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
        var parsed = this.parseColors(config);
        if (type === 'borders') {
            each(config, function (def, key) {
                if (key !== 'label') {
                    parsed[key] = this.parseColors(def);
                }
            }, this);
        }
        container.push(parsed);
        var refs = this[this.directiveToRefs(type)];
        refs[config.label] = index;
    },
    addCellStyle: function (config) {
        this.addDirective('cellStyles', mapValues(config, function (val, key) {
            if (key === 'label') return val;
            if (typeof val === 'string') {
                var refs = this[this.directiveToRefs(key)];
                if (!refs) return 0;
                return refs[val] || 0;
            }
            return val;
        }, this));
    },
    directiveToRefs: function (directive) {
        return directive.replace(/s$/, '') + 'Refs'
    },
    getFont: function (label) {
        var fontIdx = this.fontRefs[label];
        return this.fonts[fontIdx];
    },
    parse: function (config) {
        each(config, function (conf, type) {
            if (directives[type]) {
                each(conf, this.addDirective.bind(this, type))
            }
        }, this);
        if (config.cellStyles) {
            each(config.cellStyles, this.addCellStyle, this);
        }
    },
    parseColors: function (config) {
        return mapValues(config, function (val, key) {
            if (key.match(/color/i)) {
                return this.resolveColor(val);
            }
            return val;
        }, this);
    },
    resolveColor: function (color) {
        if (typeof color !== 'string') return color;
        return {rgb: styleDefs.color(color)} || {indexed: 1};
    }
});


var refsCtor = { ctor: function () { return {none: 0}; } };

Object.defineProperties(Styles.prototype, utilities.defineProps({
    constant: {
        type: 'styles',
        filename: 'styles.xml'
    },
    unsettable: {
        borderRefs: refsCtor,
        borders: { ctor: function () { return [{label: 'none'}];} },
        cellStyleRefs: refsCtor,
        cellStyles: {
            ctor: function() {
                return [{
                    label: 'none',
                    font: 0,
                    border: 0,
                    fill: 0
                }];
            }
        },
        data: {
            getter: function () {
                return pick(this, 'borders', 'cellStyles', 'fills', 'fonts', 'numberFormats');
            }
        },
        path: { getter: function () {
            return this.parent ? [utilities.dirname(this.parent.path), this.filename].join('/') : this.filename;
        } },
        fillRefs: refsCtor,
        fills: {
            ctor: function() {
                return [{
                    label: 'none',
                    type: 'pattern',
                    pattern: 'none'
                }, {
                    label: 'dotted',
                    type: 'pattern',
                    pattern: 'gray125'
                }];
            }
        },
        fontRefs: refsCtor,
        fonts: { ctor: function () { return [{label: 'none', color: {size: 12, name: 'Calibri', indexed: 64}}];} },
        numberFormatRefs: {ctor: Object},
        numberFormats: {ctor: Array}
    }
}));
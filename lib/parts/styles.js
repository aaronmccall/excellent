var assign = require('lodash.assign');
var each = require('lodash.foreach');
var util = require('util');

var Part = require('./part');
var styleDefs = require('../definitions/styles');
var templates = require('./templates');
var utilities = require('../utilities');

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
    addFont: function (font) {},
    addFill: function (fill) {},
    addBorder: function (border) {},
    addCellStyle: function (style) {}, 
    parse: function (config, ) {
        each(config, function (conf, key) {

        });
    }
});

Object.defineProperties(Styles.prototype, assign(
    utilities.makeConstant('type', 'styles')
));
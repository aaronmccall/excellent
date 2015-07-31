var util = require('util');
var templates = require('./templates');
var XML = require('xml');

function Styles() {
    XML.call(this, {}, templates.styles);
}

util.inherits(Styles, XML);

module.exports = Styles;
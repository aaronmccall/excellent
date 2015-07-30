var util = require('util');

var templates = require('./templates');
var XML = require('./xml');

module.exports = function Worksheet(data, options) {
    XML.call(this, {}, templates.worksheet);
};

util.inherits(Worksheet, XML);
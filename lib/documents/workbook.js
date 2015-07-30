var assign = require('lodash.assign');
var defaults = require('lodash.defaults');
var util = require('util');

var templates = require('./templates');
var Worksheet = require('./worksheet');
var XML = require('./xml');

var defaultOptions = {
    xlsx: {
        bookSST: true,
        bookType: 'xlsx',
        type: 'binary'
    }
};

function Workbook(data, options) {
    this.data = data;
    this.options = defaults(options || {}, defaultOptions);
    XML.call(this, {}, templates.workbook);
};

util.inherits(Workbook, XML);

module.exports = Workbook;

var assign = require('lodash.assign');

var properties = require('./properties');
var refEncoders = require('./refEncoders');
var test = require('./test');
var types = require('./types');

var utilities = module.exports = assign({
    convertDateToSerial: function JSDateToExcelDate(inDate) {
        // assumes date given is GMT
        if (!(inDate instanceof Date)) inDate = new Date(inDate);
        var returnDateTime = 25569.0 + (inDate.getTime() ? (inDate / 86400000) : -25568.0);
        return returnDateTime;
    },
    dirname: function (path) {
        return path ? path.split('/').slice(0, -1).join('/') : '';
    },
    upperFirst: function (str) {
        if (!str || typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}, properties, refEncoders, test, types);

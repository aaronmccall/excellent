var properties = require('./properties');
var refEncoders = require('./refEncoders');
var test = require('./test');
var types = require('./types');

var utilities = module.exports = {
    convertDateToSerial: function JSDateToExcelDate(inDate) {
        // assumes date given is GMT
        if (!(inDate instanceof Date)) inDate = new Date(inDate);
        var returnDateTime = 25569.0 + (inDate.getTime() ? (inDate / 86400000) : -25568.0);
        return returnDateTime;
    },
    dirname: function (path) {
        return path ? path.split('/').slice(0, -1).join('/') : '';
    },
    slugify: function (str) {
        if (!str) return '';
        return String(str).toLowerCase().replace(/[^\w\s]+/g, '').replace(/[^a-z0-9]+/g, '-');
    },
    upperFirst: function (str) {
        if (!str || typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};

[properties, refEncoders, test, types].forEach(function (methods) {
    Object.keys(methods).forEach(function (method) {
        utilities[method] = methods[method];
    });
});

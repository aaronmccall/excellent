var Document = exports.Document = require('./lib/document');
exports.Workbook = require('./lib/parts/workbook');
exports.Worksheet = require('./lib/parts/worksheet');
exports.utilities = require('./lib/utilities');

exports.create = function (data, options) {
    var payload = {};
    var document = payload.document = new Document(data, options);
    if (data) {
        payload.file = document.build().toXLSX();
    }
    return payload;
};
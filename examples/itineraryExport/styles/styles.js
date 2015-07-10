var defaults = require('lodash.defaults');
var bgColors = require('../../../client/helpers/bgColors');
var jade = require('jade');

var baseFont = {
    name: "Calibri",
    size: 10
};

var styleData = module.exports = {
    namespaces: {
        "mc:Ignorable": "x14ac",
        xmlns:  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
        "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
        "xmlns:x14ac": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"
    },
    fonts: [
        defaults({ // Column headings
            size: 12,
            bold: true
        }, baseFont),
        baseFont, // main cell font
        defaults({italic: true}, baseFont), // Note cells
        defaults({bold: true}, baseFont), // Location cell
    ],
    bgColors: bgColors.slice(1).map(function (color) { return color.slice(1); }),
    headerStyle: 0,
    normalStyle: 1,
    italicStyle: 2,
    boldStyle: 3,
    nonPerfStyle: 4,
    columns: {
        'date': 9,
        'location': 15,
        'country': 15,
        'venue': 15,
        'distance': 8,
        'capacity': 8,
        'guarantee': 10,
        'dealNote': 20,
        'price': 12, 
        'holdStatus': 10,
        'holds': 10,
        'buyerNote': 15,
        'showNote': 30,
        'showAnnotation': 11
    },
    cols: jade.compileFile(__dirname + '/cols.jade', {doctype: 'xml'})
};

var types = ['Normal', 'Italic', 'Bold'];

styleData.fonts.slice(1).forEach(function (font, f) {
    styleData.bgColors.forEach(function (rgb, r) {
        var index = (f * styleData.bgColors.length) + r + 5;
        styleData[rgb + types[f]] = index;
    });
});
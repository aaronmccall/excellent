var cssColors = require('css-color-names');
var crayonColors = require('crayola-colors');
// var Joi = require('joi');

var styles = {
    borders: {
        positions: ['left', 'right', 'top', 'bottom', 'diagonal'],
        styles: [
            'dashDot', 'dashDotDot', 'dashed', 'dotted', 'double', 'hair', 'medium',
            'mediumDashDot', 'mediumDashDotDot', 'mediumDashed', 'none', 'slantDashDot',
            'thick', 'thin'
        ],
        defaultStyle: 'thin',
        defaultPositions: ['left', 'right', 'top', 'bottom']
    },
    fills: {
        types: ['gradient', 'pattern'],
        gradient: {
            types: ['linear', 'path']
        }
    },
    fonts: {
        defaultName: 'Calibri',
        defaultSize: 10
    },
    numFormats: {},
    defaultColor: {rgb: 'FF000000'}
};

styles.color = function (name) {
    var color;
    if ((color = cssColors[name])) {
        return 'FF' + color.slice(1).toUpperCase();
    }
    if ((color = crayonColors[name])) {
        return 'FF' + color;
    }
}

module.exports = Object.freeze(styles);
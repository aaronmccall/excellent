var Joi = require('joi');
var styles = {
    borders: {
        positions: ['left', 'right', 'top', 'bottom', 'diagonal'],
        styles: [
            'dashDot', 'dashDotDot', 'dashed', 'dotted', 'double', 'hair', 'medium',
            'mediumDashDot', 'mediumDashDotDot', 'mediumDashed', 'none', 'slantDashDot',
            'thick', 'thin'
        ],
        defaultStyle: 'thin',
        defaultPositions: ['left', 'right', 'top', 'bottom'],
        defaultColor: {rgb: 'FF000000'}
    }
};

styles.borders.schema = Joi.array().items();
module.exports = Object.freeze();
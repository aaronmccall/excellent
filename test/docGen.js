var Document = require('../lib/document');
var fs = require('fs');
var dkGreyBorder = {style: 'thin', color: 'Charcoal Gray'};
var doc = new Document({
    sheets: {
        'Summary': {
            image: {image: fs.readFileSync(__dirname + '/assets/dog.png'), filename: 'dog.png'},
            rows: [{
                cells: [
                    'foo',
                    {value: 'bar', style: 'bold'},
                    {value: 'foo', style: 'lemonBg'},
                    'baz',
                    {value: 'quux', style: 'lemonBgBold'}
                ]
            }, {
                cells: ['', {value: 'WAT?!', style: 'brick'}, {value: 'dotty', style: 'dotty'}]
            }]
        }
    },
    styles: {
        borders: [{label: 'dkGrey', left: dkGreyBorder, right: dkGreyBorder, top: dkGreyBorder, bottom: dkGreyBorder}],
        fonts: [{label: 'bold', bold: true}, {label: 'brick', color: 'Brick Red'}],
        fills: [{label: 'lemon', type: 'pattern', color: 'Lemon Glacier'}],
        cellStyles: [
            {label: 'bold', font: 'bold'},
            {label: 'brick', font: 'brick', border: 'dkGrey'},
            {label: 'lemonBg', fill: 'lemon'},
            {label: 'lemonBgBold', font: 'bold', fill: 'lemon'},
            {label: 'dotty', fill: 1}
        ]
    }
});

fs.writeFileSync(__dirname + '/test.xlsx', doc.toXLSX());
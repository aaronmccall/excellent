var Code = require('code');
var Lab = require('lab');
var partial = require('lodash.partial');

var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;
var bdd = {it: it, expect: expect};

var utilities = require('../lib/utilities');
var Styles = require('../lib/parts/styles');

var borderDef = {style: 'thin', color: {rgb: 'FFCCCCCC'}}
describe('Styles', function () {
    var styles = new Styles({
        borders: [
            {
                label: 'main',
                left: borderDef,
                right: borderDef,
                top: borderDef,
                bottom: borderDef
            }
        ],
        fills: [
            {label: 'danger', color: 'Red'}
        ],
        fonts: [],
        cellStyles: []
    }, {name: 'Sheet1', path: 'xl/worksheets/sheet1.xml'});
    var readOnlyTest = partial(utilities.readOnlyTest, bdd, styles);
    var constantTest = partial(utilities.constantTest, bdd, styles);
    constantTest('type');
    constantTest('filename');
    readOnlyTest('borderRefs');
    readOnlyTest('borders');
    readOnlyTest('cellStyleRefs');
    readOnlyTest('cellStyles');
    readOnlyTest('data');
    readOnlyTest('path');
    readOnlyTest('fillRefs');
    readOnlyTest('fills');
    readOnlyTest('fontRefs');
    readOnlyTest('fonts');
    readOnlyTest('numberFormatRefs');
    readOnlyTest('numberFormats');
});
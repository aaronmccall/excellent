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
var Workbook = require('../lib/parts/workbook');

function readOnlyTest(obj, name, test) {
    it('has a read-only property: ' + name, function (done) {
        if (test) test();
        expect(function () { obj[name] = 'foo'; }).to.throw(Error, new RegExp("Cannot set " + name + " directly\."));
        done()
    });
}

describe('Workbook', function () {
    var workbook = new Workbook();
    var readOnlyTest = partial(utilities.readOnlyTest, bdd, workbook);
    var constantTest = partial(utilities.constantTest, bdd, workbook);
    constantTest('type');
    constantTest('path');
    readOnlyTest('data');
    readOnlyTest('definedNames');
    readOnlyTest('sheets');
    readOnlyTest('sheetNames');
});

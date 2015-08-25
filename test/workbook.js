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
var SharedStrings = require('../lib/parts/sharedStrings');

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
    constantTest('filename', function () {
        expect(workbook.filename).to.be.a.string();
        expect(workbook.filename).to.equal('workbook.xml');
    });
    constantTest('type', function () {
        expect(workbook.type).to.be.a.string();
        expect(workbook.type).to.equal('officeDocument');
    });
    readOnlyTest('data', function () {
        expect(workbook.data).to.be.an.object();
        expect(workbook.data).to.deep.equal({sheets: [], hasDefinedNames: false, definedNames: {}});
    });
    readOnlyTest('definedNames', function () {
        expect(workbook.definedNames).to.be.an.object();
        expect(workbook.definedNames).to.deep.equal({});
    });
    readOnlyTest('path', function () {
        expect(workbook.path).to.be.a.string();
        expect(workbook.path).to.include('xl', workbook.filename);
    });
    readOnlyTest('sharedStrings', function () {
        expect(workbook.sharedStrings).to.be.an.instanceof(SharedStrings);
    });
    readOnlyTest('sheets', function () {
        expect(workbook.sheets).to.be.an.array();
        expect(workbook.sheets).to.have.length(0);
    });
    readOnlyTest('sheetNames', function () {
        expect(workbook.sheetNames).to.be.an.array();
        expect(workbook.sheetNames).to.have.length(0);
    });
});

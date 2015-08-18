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
var Document = require('../lib/document');
var JSZip = require('jszip');
var Rels = require('../lib/parts/rels');

describe('Document', function () {
    var document = new Document({sheets: []}, {lazy: false});
    var readOnlyTest = partial(utilities.readOnlyTest, bdd, document);
    var constantTest = partial(utilities.constantTest, bdd, document);
    constantTest('filename', function () {
        expect(document.filename).to.be.a.string();
        expect(document.filename).to.equal('');
    });
    constantTest('path', function () {
        expect(document.path).to.be.a.string();
        expect(document.path).to.equal('');
    });
    utilities.writeOnceTest(bdd, document, 'workbook');
    readOnlyTest('container', function () {
        expect(document.container).to.be.an.object();
        expect(document.container).to.be.an.instanceof(JSZip);
    });
    readOnlyTest('data', function () {
        expect(document.data).to.be.an.object();
        expect(document.data).to.deep.equal({sheets: []});
    });
    readOnlyTest('options', function () {
        expect(document.options).to.be.an.object();
        expect(document.options).to.deep.equal({lazy: false});
    });
    readOnlyTest('rels', function () {
        expect(document.rels).to.be.an.instanceof(Rels);
    });
    it('addData: merges new data with existing data', utilities.wrapDone(function () {
        var document = new Document({sheets: []});
        var sheets = document.data.sheets;
        document.addData();
        document.addData({sheets: [{rows: []}]});
        document.addData({sheets: {rows: []}, definedNames: {}});
        expect(document.data.sheets).to.equal(sheets);
        expect(document.data.sheets).to.have.length(2);
        expect(document.data).to.deep.equal({
            sheets: [{rows: []}, {rows: []}],
            definedNames: {}
        });
    }));
    it('always has data and options objects', utilities.wrapDone(function () {
        var doc = new Document();
        expect(doc.data).to.be.an.object().and.deep.equal({});
        expect(doc.options).to.be.an.object().and.deep.equal({});
    }))
});

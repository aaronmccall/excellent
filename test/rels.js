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
var Rels = require('../lib/parts/rels');

describe('Rels', function () {
    var rels = new Rels({path: 'xl/workbook.xml', filename: 'workbook.xml'});
    var readOnlyTest = partial(utilities.readOnlyTest, bdd, rels);
    var constantTest = partial(utilities.constantTest, bdd, rels);
    constantTest('type');
    readOnlyTest('parts', function () {
        expect(rels.parts).to.be.an.array();
        expect(rels.parts).to.have.length(0);
    });
    readOnlyTest('path', function () {
        expect(rels.path).to.be.a.string();
        expect(rels.path).to.include(rels.parent.filename, rels.parent.path.split('/').shift());
    });
    readOnlyTest('data');
    it('has an add method for each relationship type');
    it('stores related parts in ')
});

var Code = require('code');
var Lab = require('lab');
var partial = require('lodash.partial');

var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.before;
var after = lab.after;
var expect = Code.expect;
var bdd = {it: it, expect: expect};

var utilities = require('../lib/utilities');
var Rels = require('../lib/parts/rels');
var relationships = require('../lib/definitions/relationships');

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
    it('addRel(type, part)', utilities.wrapDone(function () {
        var rels = new Rels({});
        var part = {};
        rels.addRel('foo', part);
        expect(rels.parts).to.be.an.array().and.deep.equal([{type: 'foo', part: part}]);
    }));
    it('addRel(part)', utilities.wrapDone(function () {
        var rels = new Rels({});
        var part = {type: 'foo'};
        rels.addRel(part);
        expect(rels.parts).to.be.an.array().and.deep.equal([{type: 'foo', part: part}]);
    }));
    it('addRel error conditions', utilities.wrapDone(function () {
        expect(function () {
            rels.addRel('test');
        }).to.throw(TypeError, /must be called with a part/);
        expect(function () {
            rels.addRel(null, 'foo');
        }).to.throw(TypeError, /must be called with a type/);
    }))
    it('has an add method for each relationship type', utilities.wrapDone(function () {
        Object.keys(relationships).forEach(function (key) {
            var name = 'add' + utilities.upperFirst(key);
            expect(rels[name]).to.exist().and.be.a.function();
        });
    }));
    it('getId returns indexOf part in parts + 1', utilities.wrapDone(function () {
        var rels = new Rels({});
        var part = {type: 'foo'};
        rels.addRel(part);
        expect(rels.getId(part)).to.equal(1);
    }))
    it('data contains transformed part items', utilities.wrapDone(function () {
        var rels = new Rels({});
        rels.addRel({type: 'foo', path: 'bar'});
        rels.addRel({type: 'hyperlink'});
        expect(rels.data[0]).to.deep.equal({rId: 'rId1', type: 'foo', target: 'bar', targetMode: undefined, part: rels.parts[0].part});
        expect(rels.data[1]).to.deep.equal({rId: 'rId2', type: relationships.hyperlink, target: undefined, targetMode: undefined, part: rels.parts[1].part});
    }));
    it('has getter props that filter parts by type', utilities.wrapDone(function () {
        var rels = new Rels({});
        var types = Object.keys(relationships);
        types.forEach(function (type, i) {
            var part = {path: 'path' + i, index: i, id: 'rId' + (i+1)};
            rels.addRel(type, {path: 'path' + i, index: i, id: 'rId' + (i+1)});
            expect(rels[type][0]).to.deep.equal({
                rId: 'rId' + (i+1),
                type: relationships[type],
                target: part.path,
                targetMode: undefined,
                part: part
            });
            expect(rels.parts[i]).to.deep.equal({
                type: type,
                part: part
            });
        });
        expect(rels.parts.length).to.equal(types.length);
    }));
});

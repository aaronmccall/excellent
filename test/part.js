var Code = require('code');
var Lab = require('lab');
var Sinon = require('sinon');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.before;
var afterEach = lab.after;
var expect = Code.expect;

var ns = require('../lib/definitions/namespaces');
var Part = require('../lib/parts/part');
var utilities = require('../lib/utilities');

describe('Part', function () {
    var spec, part;
    beforeEach(utilities.wrapDone(function () {
        Sinon.spy(ns, 'getAttributes');
        Sinon.spy(Part.prototype, 'serialize');
        spec = {test: '__main', 'other': null};
        part = new Part(spec, Sinon.spy());
    }));
    afterEach(utilities.wrapDone(function () {
        Part.prototype.serialize.restore();
        ns.getAttributes.restore();
    }));
    it('passes its namespaceSpec to namespaces.getAttributes when serializing', utilities.wrapDone(function () {
        part.serialize();
        expect(ns.getAttributes.calledOnce).to.equal(true);
        expect(ns.getAttributes.getCall(0).args[0]).to.equal(spec);
    }));
    it('adds the full namespaces module to its serialized data', utilities.wrapDone(function () {
        var data = part.serialize();
        expect(data.ns).to.exist();
        expect(data.ns).to.equal(ns);
    }));
    it('passes its serialized data to its template when outputting XML', utilities.wrapDone(function () {
        part.data = {foo: 1};
        var data = part.serialize();
        part.toXML();
        expect(part.template.calledOnce).to.equal(true);
        expect(part.template.getCall(0).args[0]).to.deep.equal(data);
    }));
    it('toXML: returns template if template is not a function', utilities.wrapDone(function () {
        expect(new Part({}, 'foo').toXML()).to.equal('foo');
    }));
});
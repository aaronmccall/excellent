var Code = require('code');
var Lab = require('lab');
var Sinon = require('sinon');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.before;
var afterEach = lab.after;
var expect = Code.expect;

var namespaces = require('../lib/definitions/namespaces');

describe('namespaces', function () {
    it('has a method named getAttributes', function (done) {
        expect(namespaces.getAttributes).to.exist();
        expect(namespaces.getAttributes(['dc', 'dcmitype'])).to.deep.equal({
            dc: namespaces.dc,
            dcmitype: namespaces.dcmitype
        });
        done();
    });

});
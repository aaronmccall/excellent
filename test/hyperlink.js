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
var Hyperlink = require('../lib/parts/hyperlink');

describe('Hyperlink', function () {
    var hyperlink = new Hyperlink({
        url: 'foo',
        ref: 'A1',
    });
    var constantTest = partial(utilities.constantTest, bdd, hyperlink);
    var readOnlyTest = partial(utilities.readOnlyTest, bdd, hyperlink);
    var writeOnceTest = partial(utilities.writeOnceTest, bdd, hyperlink);
    constantTest('type');
    constantTest('targetMode');
    constantTest('attrList');
    readOnlyTest('path', function () {
        expect(hyperlink.path).to.equal(hyperlink.url);
    });
    writeOnceTest('ref');
    writeOnceTest('url');
    hyperlink = new Hyperlink({
        ref: 'B2',
        location: 'Sheet1!A5',
        tooltip: 'Go to A5'
    });
    writeOnceTest = partial(utilities.writeOnceTest, bdd, hyperlink);
    writeOnceTest('location');
    writeOnceTest('tooltip');
    it('throws when no attrs object', utilities.wrapDone(function () {
        expect(function () {
            new Hyperlink();
        }).to.throw(TypeError, /must be instantiated with an attrs object/)
    }));
    it('throws when no attrs.ref', utilities.wrapDone(function () {
        expect(function () {
            new Hyperlink({url: 'foo'});
        }).to.throw(TypeError, /Missing attrs.ref\./);
    }));
    it('throws when no attrs.url and no attrs.location', utilities.wrapDone(function () {
        expect(function () {
            new Hyperlink({ref: 'C3'});
        }).to.throw(TypeError, /Missing attrs.url and attrs.location./)
    }));
});
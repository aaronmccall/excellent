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
var SharedStrings = require('../lib/parts/sharedStrings');
var Rels = require('../lib/parts/rels');

function readOnlyTest(obj, name, test) {
    it('has a read-only property: ' + name, function (done) {
        if (test) test();
        expect(function () { obj[name] = 'foo'; }).to.throw(Error, new RegExp("Cannot set " + name + " directly\."));
        done()
    });
}

describe('SharedStrings', function () {
    var sharedStrings = new SharedStrings();
    var readOnlyTest = partial(utilities.readOnlyTest, bdd, sharedStrings);
    var constantTest = partial(utilities.constantTest, bdd, sharedStrings);
    constantTest('filename');
    readOnlyTest('data', function () {
        var sharedStrings = new SharedStrings();
        sharedStrings.add('foo');
        expect(sharedStrings.data).to.deep.equal({
            count: 1,
            strings: ['foo']
        });
    });
    readOnlyTest('path', function () {
        expect(sharedStrings.path).to.equal(sharedStrings.filename);
        var sharedStrings2 = new SharedStrings({path: 'foo/bar.xml'});
        expect(sharedStrings2.path).to.equal(utilities.dirname(sharedStrings2.parent.path) + '/' + sharedStrings2.filename);
    });
    readOnlyTest('strings');
    readOnlyTest('stringMap');
    it('count is incrememented by every add, even if no new string added', utilities.wrapDone(function () {
        expect(sharedStrings.count).to.equal(0);
        sharedStrings.add('foo');
        sharedStrings.add('');
        sharedStrings.add('foo');
        expect(sharedStrings.count).to.equal(3);
        expect(sharedStrings.strings.length).to.equal(2);
    }));
});
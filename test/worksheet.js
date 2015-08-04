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
var Worksheet = require('../lib/parts/worksheet');

describe('Worksheet', function () {
    var worksheet = new Worksheet();
    var readOnlyTest = partial(utilities.readOnlyTest, bdd, worksheet);
    var constantTest = partial(utilities.constantTest, bdd, worksheet);
    constantTest('type');
    readOnlyTest('dimension');
    readOnlyTest('filename');
    readOnlyTest('index');
    readOnlyTest('id');
    readOnlyTest('path');
    readOnlyTest('range');
    readOnlyTest('rows');
    readOnlyTest('data');
});

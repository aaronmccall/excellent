var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

var utilities = require('../lib/utilities');

describe('utilities', function () {
    it('convertDateToSerial: converts JS dates to OOXML dates', utilities.wrapDone(function () {
        expect(utilities.convertDateToSerial(new Date(Date.UTC(1900, 0, 0)))).to.equal(1);
        expect(utilities.convertDateToSerial('1900-01-01T00:00:00.000Z')).to.equal(2);
        expect(utilities.convertDateToSerial('invalid')).to.equal(1);
    }));
    it('dirname: strips the last segment from a unix-style path', utilities.wrapDone(function () {
        expect(utilities.dirname('xl/workbook.xml')).to.equal('xl');
        expect(utilities.dirname('xl/worksheets/_rels/sheet1.xml')).to.equal('xl/worksheets/_rels');
        expect(utilities.dirname(null)).to.equal('');
    }));
    it('unsettable: allows creation of read-only properties of any type', utilities.wrapDone(function () {
        var o = {};
        Object.defineProperties(o, utilities.unsettable('foo', {getter: function () { return o; }}));
        expect(o.foo).to.equal(o);
        expect(function () { utilities.unsettable('foo'); }).to.throw(Error, /\[unsettable\]/);
        expect(function () { utilities.unsettable('foo', {}); }).to.throw(Error, /\[unsettable\]/);
    }));
    it('encodeCol: encodes 0-based column indices per OOXML alpha indexing', utilities.wrapDone(function () {
        expect(utilities.encodeCol(0)).to.equal('A');
        expect(utilities.encodeCol(0, true)).to.equal('$A');
    }));
    it('encodeRow: encodes 0-based row indices per OOXML 1-based indexing', utilities.wrapDone(function () {
        expect(utilities.encodeRow(0)).to.equal('1');
        expect(utilities.encodeRow(0, true)).to.equal('$1');
    }));
    it('encodeCell: encodes an OOXML cell addresses using encodeCol and encodeRow', utilities.wrapDone(function () {
        expect(utilities.encodeCell(0, 0)).to.equal('A1');
        expect(utilities.encodeCell(0, 0, true)).to.equal('$A$1');
        expect(utilities.encodeCell({col: 0, row: 0})).to.equal('A1');
        expect(utilities.encodeCell({})).to.equal('');
        expect(utilities.encodeCell()).to.equal('');
    }));
    it('encodeRange: encodes an OOXML cell range address using encodeCell', utilities.wrapDone(function () {
        expect(utilities.encodeRange({start: {col: 0, row: 0}, end: {col: 1, row: 1}})).to.equal('A1:B2');
        expect(utilities.encodeRange({col: 0, row: 0}, {col: 1, row: 1}, true)).to.equal('$A$1:$B$2');
        expect(utilities.encodeRange({col: 0, row: 0}, false)).to.equal('A1');
        expect(utilities.encodeRange({col: 0, row: 0}, {col: 0, row: 0})).to.equal('A1');
        expect(utilities.encodeRange()).to.equal('');
    }));
    it('isObject: checks whether arg is of type "object" and has a "class string" that matches Object\'s', utilities.wrapDone(function () {
        expect(utilities.isObject({})).to.equal(true);
        expect(utilities.isObject(new function () {})).to.equal(true);
        expect(utilities.isObject([])).to.equal(false);
        expect(utilities.isObject(null)).to.equal(false);
    }));
});
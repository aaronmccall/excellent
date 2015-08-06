var assign = require('lodash.assign');
var merge = require('lodash.merge');
var JSZip = require('jszip');
var util = require('util');

var Part = require('./parts/partWithRels');
var Workbook = require('./parts/workbook');
var templates = require('./parts/templates');
var utilities = require('./utilities');

function Document(data, options) {
    Part.call(this, {
        contentTypes: '__main'
    }, templates.contentTypes)
    this.setData(data);
    this.setOptions(options);
    if (this.data.sheets && !this.options.lazy) {
        this.addWorkbook(this.data);
    }
}
module.exports = Document;
util.inherits(Document, Part);

assign(Document.prototype, {
    addData: function (data) {
        merge(this.data, data || {}, function (tgt, src) {
            if (Array.isArray(tgt)) {
                tgt.push.apply(tgt, Array.isArray(src) ? src : [src]);
                return tgt;
            }
        });
    },
    addWorkbook: function (data) {
        this.workbook = new Workbook(data);
        this.rels.addRel(this.workbook.type, this.workbook);
    },
    setData: function (data) {
        this._data = assign({}, data || {});
    },
    setOptions: function (options) {
        this._options = assign({}, options || {});
    },
    build: function () {

    },
    save: function (nameOrStream) {},
    serialize: function () {
        return {
            defaults: 
        }
    },
    toXLSX: function () {
        return this.build().container.generate({
            type: 'nodebuffer',
            compression: 'DEFLATE'
        });
    }
});

Object.defineProperties(Document.prototype, assign(
    utilities.makeConstant('path', ''),
    utilities.makeConstant('filename', ''),
    utilities.writeOnce('workbook'),
    utilities.unsettable('container', {ctor: JSZip}),
    utilities.unsettable('data', {ctor: Object}),
    utilities.unsettable('options', {ctor: Object}),
    utilities.unsettable('rels', {
        getter: function() { return this._rels || (this._rels = new Rels(this)); }
    })
));
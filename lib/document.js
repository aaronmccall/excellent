var assign = require('lodash.assign');
var defaults = require('lodash.defaults');
var merge = require('lodash.merge');
var pick = require('lodash.pick');
var JSZip = require('jszip');
var util = require('util');

var ContentTypes = require('./parts/contentTypes');
var CoreProperties = require('./parts/coreProperties');
var Part = require('./parts/partWithRels');
var Workbook = require('./parts/workbook');
var templates = require('./parts/templates');
var utilities = require('./utilities');

function Document(data, options) {
    this.setData(data);
    this.setOptions(options);
    if (this.data.sheets && !this.options.lazy) {
        this.addWorkbook(this.data);
    }
    Part.call(this)
}
module.exports = Document;
util.inherits(Document, Part);

assign(Document.prototype, {
    addContentTypes: function () {
        this.contentTypes = new ContentTypes(this.parts);
        this.container.file(this.contentTypes.path, this.contentTypes.toXML());
    },
    addData: function (data) {
        merge(this.data, data || {}, function (tgt, src) {
            if (utilities.isArray(tgt)) {
                tgt.push.apply(tgt, utilities.isArray(src) ? src : [src]);
                return tgt;
            }
        });
    },
    addDocProps: function (props) {
        if (!props && !this.data.docProps) return;
        this.docProps = new CoreProperties(defaults(props || {}, this.data.docProps || {}));
        this.rels.addRel(this.docProps);
    },
    addPart: function (part) {
        part = part.part || part;
        this.container.file(part.path, part.toXML());
        this.parts.push(part);
        if (part.parts && part.parts.length) {
            part.parts.forEach(this.addPart, this);
        } else if (part.rels && part.rels.parts.length) {
            this.addPart(part.rels);
        }
    },
    addParts: function () {
        this.addPart(this.rels);
    },
    addWorkbook: function (data) {
        this.workbook = new Workbook(pick(data || this.data, 'sheets', 'styles'));
        this.rels.addRel(this.workbook);
    },
    setData: function (data) {
        this._data = assign({}, data || {});
    },
    setOptions: function (options) {
        this._options = assign({}, options || {});
    },
    build: function (data) {
        // Add docProps/core.xml if we have docProps
        this.addDocProps((data || {}).docProps);
        if (!this.workbook) this.addWorkbook(data);
        this.addParts();
        this.addContentTypes();
        return this;
    },
    save: function (nameOrStream) {},
    toXLSX: function () {
        return this.build().container.generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
    }
});

Object.defineProperties(Document.prototype, utilities.defineProps({
    constant: {
        path: '',
        filename: ''
    },
    unsettable: {
        container: {ctor: JSZip},
        data: {ctor: Object},
        options: {ctor: Object},
        parts: {ctor: Array}
    },
    writeOnce: {
        docProps: 1,
        workbook: 1
    }
}));
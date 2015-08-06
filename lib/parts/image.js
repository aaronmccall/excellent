var assign = require('lodash.assign');
var Buffer = require('Buffer');
var imageSize = require('image-size');
var util = require('util');

var Part = require('./partWithRels');
var templates = require('./templates');
var utilities = require('../utilities');

function Image(imageBuffer, data) {
    this.image = imageBuffer;
    this.importData(data);
    Part.call(this, {drawingml: 'a', spreadsheetDrawing: 'xdr'}, templates.image);
};
module.exports = Image;
util.inherits(Image, Part);

assign(Image.prototype, {
    importData: function (data) {
        if (!data) throw new TypeError('data must be an Object');
        if (!data.origin) {
            data.origin = {x: 0, y: 0};
        }
        if (!(this.image instanceof Buffer)) {
            throw new TypeError('Image must be of type: Buffer. Image data passed as: ' + typeof this.image);
        }
        assign(this.imageData, data, imageSize(this.image));
    }
});

Object.defineProperties(Image.prototype, assign(
    utilities.unsettable('data', {
        getter: function() {
            var imageData = this.imageData;
            return assign({
                extent: {cx: imageData.width, cy: imageData.height}
            }, imageData);
        }
    }),
    utilities.unsettable('id', {
        getter: function() {
            var index = this.index;
            return ++index;
        }
    }),
    utilities.unsettable('index', {
        getter: function() {
            return this.parent ? this.parent.images.indexOf(this.name) : 0;
        }
    }),
    utilities.unsettable('id', {
        getter: function() { return ++this.index; }
    }),
    utilities.unsettable('imageData', {ctor: Object})
));
var assign = require('lodash.assign');
var imageSize = require('image-size');
var util = require('util');
var templates = require('./templates');
var XML = require('./xml');

module.exports = function Image(image, data) {
    this.image = image;
    this.data = this.validate(data);
    XML.call(this, {drawingml: 'a', spreadsheetDrawing: 'xdr'}, templates.image);
};

assign(Image.prototype, {
    validate: function (data) {
        if (!data) throw new TypeError('data must be an Object');
        if (!data.relationshipId || parseInt(data.relationshipId) !== data.relationshipId) {
            throw new TypeError('data.relationshipId must be an Integer');
        }
        return data;
    },
    getSize: function () {

    },
    serialize: function() {
        var payload = XML.prototype.serialize.call(this);
        var size = this.getSize();
        payload.extents = {cx: size.width, cy: size.height};
        return payload;
    }
});

util.inherits(Image, XML);
var assign = require('lodash.assign');
var identity = require('lodash.identity');
var mapKeys = require('lodash.mapkeys');
var mapValues = require('lodash.mapvalues');
var omit = require('lodash.omit');
var path = require('path');
var pick = require('lodash.pick');
var imageSize = require('image-size');
var util = require('util');

var Part = require('./partWithRels');
var templates = require('./templates');
var utilities = require('../utilities');

function Image(data, parent) {
    this.parent = parent;
    this.importData(data);
    Part.call(this, {
        drawingml: 'a',
        spreadsheetDrawing: 'xdr'
    }, templates.image);
};
module.exports = Image;
util.inherits(Image, Part);

assign(Image.prototype, {
    importData: function(data) {
        if (!data) throw new TypeError('data must be an Object');
        if (!(data.image instanceof Buffer)) {
            throw new TypeError('data.image must be of type: Buffer. data.image passed as: ' + typeof data.image);
        }
        assign(this.imageData, data);
        
        if (!data.origin) {
            this.imageData.origin = {
                x: 0,
                y: 0
            };
        }

        assign(this.imageData, this.getImageSize());
        this.rels.addImage({ path: this.imageFile.path });
    },
    getFilename: function () {
        return this.imageData.filename || [
            utilities.slugify(this.parent ? this.parent.name : ''),
            'image' + this.id,
            this.imageData.type
        ].filter(identity).join('.');
    },
    getImageSize: function(image) {
        return imageSize(this.image, this.imageData.filename);
    },
    pxToEMU: function (px) {
        return px * 10270;
    }
});

Object.defineProperties(Image.prototype, utilities.defineProps({
    constant: {type: 'drawing'},
    unsettable: {
        'data': {
            getter: function() {
                var data = assign(pick(this.imageData, 'filename', 'width', 'height', 'type', 'name', 'description'), {
                    extent: {
                        cx: this.pxToEMU(this.imageData.width),
                        cy: this.pxToEMU(this.imageData.height)
                    },
                    origin: {
                        x: this.pxToEMU(this.imageData.origin.x),
                        y: this.pxToEMU(this.imageData.origin.y)
                    },
                    id: this.id
                });
                return data;
            }
        },
        filename: { 
            getter: function() { return this.type + this.id + '.xml'; }
        },
        id: { 
            getter: function() { return this.parent && this.parent.rels ? this.parent.rels.getId(this) : 0; }
        },
        image: {
            getter: function() { return this.imageData.image; }
        },
        imageData: { ctor: Object },
        path: {
            getter: function() { return 'xl/drawings/' + this.filename; }
        },
        imageFile: {
            getter: function () {
                return {
                    path: 'xl/media/' + this.getFilename(),
                    data: this.imageData.image
                };
            }
        }
    }
}));
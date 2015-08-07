var fs = require('fs');
var partial = require('lodash.partial');

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;
var bdd = {it: it, expect: expect};

var utilities = require('../lib/utilities');
var Image = require('../lib/parts/image');

describe('Image', function () {
    var imageBuffer = fs.readFileSync(__dirname + '/assets/dog.png');
    var image = new Image({
        image: imageBuffer,
        filename: 'dog.png',
        origin: {x: 1, y: 1}
    }, { rels: { getId: function () { return 1; }}});
    var constantTest = partial(utilities.constantTest, bdd, image);
    var readOnlyTest = partial(utilities.readOnlyTest, bdd, image);
    var writeOnceTest = partial(utilities.writeOnceTest, bdd, image);
    constantTest('type');
    readOnlyTest('data', function () {
        var data = image.data;
        expect(data).to.deep.equal({
            filename: 'dog.png',
            height: image.imageData.height,
            id: image.id,
            type: 'png',
            width: image.imageData.width,
            extent: {cx: image.pxToEMU(image.imageData.width), cy: image.pxToEMU(image.imageData.height)},
            origin: {x: image.pxToEMU(image.imageData.origin.x), y: image.pxToEMU(image.imageData.origin.y)}
        });
    });
    readOnlyTest('filename', function () {
        expect(image.filename).to.equal(image.type + 1 + '.xml');
        expect(new Image({image: imageBuffer}).filename).to.equal(image.type + 0 + '.xml');
    });
    readOnlyTest('id');
    readOnlyTest('image');
    readOnlyTest('imageData');
    readOnlyTest('path', function () {
        expect(image.path).to.include(image.filename, 'xl/drawings');
    });
    it('throws when no data passed', utilities.wrapDone(function () {
        expect(function () { new Image(); }).to.throw(TypeError, /data must be an Object/)
    }));
    it('throws when no data.image is not a Buffer', utilities.wrapDone(function () {
        expect(function () { new Image({ image: 1 }); }).to.throw(TypeError, /must be of type: Buffer.*number/)
    }));
    it('sets origin to top left when no origin passed', utilities.wrapDone(function () {
        var image = new Image({ image: imageBuffer });
        expect(image.imageData.origin).to.deep.equal({x: 0, y: 0});
    }));
});
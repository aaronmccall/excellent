var Part = require('./part');
var Rels = require('./rels');
var util = require('util');
var utilities = require('../utilities');

function PartWithRels() {
    Part.apply(this, arguments);
}
module.exports = PartWithRels;

util.inherits(PartWithRels, Part);

Object.defineProperties(
    PartWithRels.prototype,
    utilities.unsettable('rels', {
        getter: function() {
            return this._rels || (this._rels = new Rels(this));
        }
    })
);
var pick = require('lodash.pick');
var util = require('util');

var contentTypes = require('../definitions/contentTypes');
var Part = require('./part');
var templates = require('./templates');
var utilities = require('../utilities');

function ContentTypes() {
    Part.call(this, {
        contentTypes: '__main'
    }, templates.contentTypes)
}
module.exports = ContentTypes;
util.inherits(ContentTypes, Part);

Object.defineProperties(ContentTypes.prototype, assign(
    utilities.makeConstant('path', '[Content_Types].xml'),
    utilities.unsettable('data', {
        getter: function() {
            return {
                defaults: pick(contentTypes.defaults, 'rels', 'xml'),
                overrides: this.parts.map(function (part) {
                    return {
                        type: contentTypes.overrides[part.type],
                        path: part.path
                    };
                });
            }
        }
    }),
    utilities.unsettable('parts', {getter: function () {
        return [{}]
    }})
));
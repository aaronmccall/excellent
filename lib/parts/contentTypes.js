var assign = require('lodash.assign');
var pick = require('lodash.pick');
var util = require('util');

var contentTypes = require('../definitions/contentTypes');
var Part = require('./part');
var templates = require('./templates');
var utilities = require('../utilities');

function ContentTypes(data) {
    Part.call(this, {
        contentTypes: '__main'
    }, templates.contentTypes);
    this.initialize(data);
}
module.exports = ContentTypes;
util.inherits(ContentTypes, Part);

assign(ContentTypes.prototype, {
    initialize: function (data) {
        if (data) {
            this.parts = data;
        }
    }
});

Object.defineProperties(ContentTypes.prototype, utilities.defineProps({
    constant: {
        path: '[Content_Types].xml',
        type: 'contentTypes'
    },
    unsettable: {
        data: {
            getter: function() {
                return {
                    defaults: contentTypes.getDefaults(this.parts.map(function (part) { return part.path; })),
                    overrides: this.parts.filter(function (part) {
                        return contentTypes.overrides[part.type];
                    }).map(function (part) {
                        return {
                            type: contentTypes.overrides[part.type],
                            path: part.path
                        };
                    })
                }
            }
        }
    },
    writeOnce: {
        parts: {
            getter: function () {
                return this._parts || (this._parts = []);
            },
            setter: function (val) {
                this._parts = utilities.isArray(val) ? val.slice(0) : [val];
            }
        }
    }
}));
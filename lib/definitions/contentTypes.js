var mime = require('mime');
mime.default_type = '';
mime.define({
    "application/vnd.openxmlformats-package.relationships+xml": ['rels']
})

module.exports = Object.freeze({
    getDefaults: function (fileList) {
        var payload = {};
        fileList.forEach(function (file) {
            var type = mime.lookup(file);
            if (!type) throw TypeError('[Content_Types] ' + file + ' does not have a valid mime type.')
            var ext = mime.extension(type);
            if (!payload[ext]) payload[ext] = type;
        });
        return payload;
    },
    overrides: {
        coreProperties: "application/vnd.openxmlformats-package.core-properties+xml",
        drawing: "application/vnd.openxmlformats-officedocument.drawing+xml",
        styles: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
        theme: "application/vnd.openxmlformats-officedocument.theme+xml",
        officeDocument: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
        sharedStrings: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
        worksheet: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"
    }
});
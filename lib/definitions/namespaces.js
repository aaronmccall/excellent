var each = require('lodash.foreach');

// TODO: move this to utilities for thorough testing
function getNamespaces(defs, nsCollection) {
    var namespaces = {};
    each(nsCollection, function (ns, key) {
        var keyParts = ['xmlns'];
        if (ns !== '__main') keyParts.push(ns);
        namespaces[keyParts.join(':')] = defs[typeof key === 'string' ? key : ns];
    });
    return namespaces;
}

var namespaces = {
    contentTypes: "http://schemas.openxmlformats.org/package/2006/content-types",
    cp: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
    dc: "http://purl.org/dc/elements/1.1/",
    dcmitype: "http://purl.org/dc/dcmitype/",
    dcterms: "http://purl.org/dc/terms/",
    drawingml: "http://schemas.openxmlformats.org/drawingml/2006/main",
    docPropsVTypes: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
    extendedProperties: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
    markupCompatibility: "http://schemas.openxmlformats.org/markup-compatibility/2006" ,
    spreadsheetDrawing: "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
    spreadsheetml: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    relationshipsMain: "http://schemas.openxmlformats.org/package/2006/relationships",
    relationships: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    x14ac: "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac",
    xsi: "http://www.w3.org/2001/XMLSchema-instance"
};

namespaces.getAttributes = getNamespaces.bind(null, namespaces);

module.exports = namespaces;
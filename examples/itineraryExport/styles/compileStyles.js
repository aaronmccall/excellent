// TODO: move his logic to an async method in styles.js
var jade = require('jade');
var styleData = require('./styles');

var template = jade.compileFile(__dirname + '/styles.jade', {doctype: 'xml'});

console.log(template(styleData));
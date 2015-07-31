/*
   Functions prefixed 'encode_' contain code that is Copyright (C) 2012-2015  SheetJS see NOTICE for details.
*/
var isObject = require('./types').isObject;

function encode_row(row) {
    return "" + (row + 1);
}
exports.encodeRow = encode_row;

function encode_col(col) {
    var s = "";
    for (++col; col; col = Math.floor((col - 1) / 26)) {
        s = String.fromCharCode(((col - 1) % 26) + 65) + s;
    }
    return s;
}
exports.encodeCol = encode_col;

function encode_cell(cell) {
    return encode_col(cell.col) + encode_row(cell.row);
}
exports.encodeCell = encode_cell;

function encode_range(cs, ce) {
    if (!isObject(ce) && isObject(cs)) return encode_range(cs.start, cs.end);
    if (isObject(cs)) cs = encode_cell(cs);
    if (isObject(ce)) ce = encode_cell(ce);
    return (cs === ce) ? cs : (cs + ":" + ce);
}
exports.encodeRange = encode_range;

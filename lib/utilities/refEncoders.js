/*
   Functions prefixed 'encode_' contain code that is Copyright (C) 2012-2015  SheetJS see NOTICE for details.
*/
var isObject = require('./types').isObject;

function encode_row(row, abs) {
    return (abs ? "$" : "") + (row + 1);
}
exports.encodeRow = encode_row;

function encode_col(col, abs) {
    var s = "";
    for (++col; col; col = Math.floor((col - 1) / 26)) {
        s = String.fromCharCode(((col - 1) % 26) + 65) + s;
    }
    return (abs ? "$" : "") + s;
}
exports.encodeCol = encode_col;

function encode_cell(col, row, abs) {
    if (typeof abs === 'undefined' && typeof row === 'boolean') {
        abs = row;
        row = null;
    }
    if (typeof col === 'number' && typeof row === 'number') {
        return encode_col(col, abs) + encode_row(row, abs)
    }
    if (typeof col === 'object' && 'col' in col && 'row' in col) {
        return encode_cell(col.col, col.row, abs);
    }
    return '';
}
exports.encodeCell = encode_cell;

function encode_range(cs, ce, abs) {
    if (typeof abs === 'undefined' && typeof ce === 'boolean') {
        abs = ce;
        ce = void 0;
    };
    if (!isObject(ce) && isObject(cs) && cs.start) return encode_range(cs.start, cs.end, abs);
    if (isObject(cs)) cs = encode_cell(cs, abs);
    if (isObject(ce)) ce = encode_cell(ce, abs);
    return ((cs === ce || !ce) ? cs : (cs + ":" + ce)) || '';
}
exports.encodeRange = encode_range;

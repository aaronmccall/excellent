function smartType(o) {
    return Object.prototype.toString.call(o).replace(/\[object (\w+)\]/, '$1');
}
exports.smartType = smartType;

function isObject(o) {
    return !!o && smartType(o) === 'Object';
}
exports.isObject = isObject;

var nativeIsArray = Array.isArray;
function isArray(a) {
    return !!a && (nativeIsArray ? nativeIsArray(a) : smartType(a) === 'Array');
}
exports.isArray = isArray;
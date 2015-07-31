function isObject(o) {
    return (typeof o === 'object') && Object.prototype.toString.call(o) === '[object Object]';
}

exports.isObject = isObject;
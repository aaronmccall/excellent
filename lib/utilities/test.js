function templatedPropTest(descr, defaultTest) {
    return function (bdd, obj, name, customTest) {
        bdd.it(descr + name, wrapDone(function (done) {
            defaultTest(bdd, obj, name);
            if (customTest) test(bdd, obj, name);
        }));
    }
}

exports.constantTest = templatedPropTest('has a constant property: ', function (bdd, obj, name) {
    bdd.expect(function () { obj[name] = 'foo'; }).to.throw(TypeError, new RegExp('Cannot set "' + name + '"\. It is a constant\.'));
});


exports.readOnlyTest = templatedPropTest('has a read-only property: ', function (bdd, obj, name) {
    bdd.expect(function () { obj[name] = 'foo'; }).to.throw(Error, new RegExp("Cannot set " + name + " directly\."));
});

function wrapDone(fn) {
    return function (done) {
        fn();
        done();
    }
}
exports.wrapDone = wrapDone;

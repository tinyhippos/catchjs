var s, catches;

module.exports = require('nodeunit').testCase({

    setUp: function (done) {
        s = require('sinon').sandbox.create();
        catches = require('./../lib/catchjs').catches;
        done();
    },

    tearDown: function (done) {
        s.verifyAndRestore();
        catches = undefined;
        done();
    },

    "catches throw": function (test) {
        test.strictEqual(catches(function () {
            throw "something";
        }), true);
        test.done();
    },

    "catches nothing": function (test) {
        test.strictEqual(catches(function () {}), false);
        test.done();
    },

    "catches string": function (test) {
        test.strictEqual(catches(function () {
            throw "something";
        }, "something"), true);
        test.done();
    },

    "catches specific name": function (test) {
        test.strictEqual(catches(function () {
            throw {name: "SomeException"};
        }, "SomeException"), true);
        test.done();
    },

    "catches specific type": function (test) {
        test.strictEqual(catches(function () {
            throw {type: "SomeException"};
        }, "SomeException"), true);
        test.done();
    },

    "catches specific object": function (test) {
        var obj = {
            type: "",
            name: ""
        };
        test.strictEqual(catches(function () {
            throw obj;
        }, obj), true);
        test.done();
    },

    "catches boolean": function (test) {
        test.strictEqual(catches(function () {
            throw false;
        }, false), true);
        test.done();
    },

    "catches numeric": function (test) {
        test.strictEqual(catches(function () {
            throw 5;
        }, 5), true);
        test.done();
    },

    "catches no string": function (test) {
        test.strictEqual(catches(function () {
            throw "something";
        }, "something else"), false);
        test.done();
    },

    "catches no specific name": function (test) {
        test.strictEqual(catches(function () {
            throw {name: "test"};
        }, "SomeException"), false);
        test.done();
    },

    "catches no specific type": function (test) {
        test.strictEqual(catches(function () {
            throw {type: "test"};
        }, "SomeException"), false);
        test.done();
    },

    "catches no specific object": function (test) {
        var obj = {
            type: "test",
            name: "test"
        };
        test.strictEqual(catches(function () {
            throw obj;
        }, {
            type: "test",
            name: "test"
        }), false);
        test.done();
    }

});

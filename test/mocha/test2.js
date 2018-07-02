var assert = require('chai').assert

describe('String function', function () {
    describe('', function () {
        it('substring is not contained in array', function () {
            assert.equal("Hello world".includes("world"), true);
        });

        it('substring is contained in array', function () {
            assert.equal("Hello world".includes("world2"), false);
        });

        it('Example fail case', function () {
            assert.equal("Hello world".includes("world2"), true);
        });
    });
});
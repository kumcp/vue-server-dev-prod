var assert = require('chai').assert

describe('Array function', function () {
    describe('', function () {
        it('Item is not contained in array', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });

        it('Item is contained in array', function () {
            let indexOfItem = [1, 2, 3].indexOf(2)
            assert.isAbove(indexOfItem, -1)
        });

        it('Example fail case', function () {
            let indexOfItem = [1, 2, 3].indexOf(2)
            assert.equal(indexOfItem == -1, true)
        });
    });
});
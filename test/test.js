const MockAjax = require('../dist/mockajax.min.js')

beforeEach(function() {
  MockAjax.mock([
    {
      url: '/user/:id',
      response: function(req) {
        console.log('params:', req.params)
        console.log('query:', req.query)
        return {
          name: 'panyx'
        }
      }
    },
    {
      url: '/user',
      method: 'POST',
      response: function(req) {
        return {
          name: 'cailin'
        }
      }
    }
  ])
})

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
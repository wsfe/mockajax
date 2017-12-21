import MockAjax from '@/index'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://wangsu.co/api/v1'
})

before(() => {
  MockAjax.openFetch();
})

MockAjax.setBasePath('/api/v1')

MockAjax.mock({
  url: /help\/.*/,
  response: function(req) {
    return {
      phone: req.query.phone
    }
  }
})
MockAjax.mock([
  {
    url: '/user/:id/:name',
    response: function(req) {
      return {
        name: req.params.name,
        id: req.params.id,
        age: req.query.age,
        country: req.query.country
      }
    }
  },
  {
    url: '/user/:name',
    response: function(req) {
      return {
        name: req.params.name,
        age: req.query.age,
        country: req.query.country
      }
    }
  },
  {
    url: '/user',
    method: 'POST',
    response: function(req) {
      return {
        name: req.body.firstName + req.body.lastName
      }
    }
  },
  {
    url: '/user',
    method: 'put',
    response: function(req) {
      return {
        name: req.body.firstName + req.body.lastName
      }
    }
  },
  {
    url: '/user/:id',
    method: 'delete',
    response: function(req) {
      return {
        id: req.params.id
      }
    }
  }
])

describe('restful api', () => {
  describe('get method', () => {
    it('shoud return user id, name, age, country', (done) => {
      axios.get('/user/123/freefish?age=20&country=china').then(response => {
        assert.equal(response.data.id, 123)
        assert.equal(response.data.name, 'freefish')
        assert.equal(response.data.age, 20)
        assert.equal(response.data.country, 'china')
        done()
      }, error => {
        done(error)
      })
    })
    it('shoud return user name, age, country', (done) => {
      axios.get('/user/freefish?age=20&country=china').then(response => {
        assert.equal(response.data.name, 'freefish')
        assert.equal(response.data.age, 20)
        assert.equal(response.data.country, 'china')
        done()
      }, error => {
        done(error)
      })
    })
    it('regex api', (done) => {
      axios.get('/help/phone?phone=0510-5555 5555').then(response => {
        assert.equal(response.data.phone, '0510-5555 5555')
        done()
      }).catch(error => {
        done(error)
      })
    })
  })
  describe('post method', () => {
    it('should return name=freefish', (done) => {
      axios.post('/user', {
        firstName: 'free',
        lastName: 'fish'
      }).then((response) => {
        assert.equal(response.data.name, 'freefish')
        done()
      }).catch(error => {
        done(error)
      })
    })
  })
  describe('put method', () => {
    it('should return name=angrytoro', (done) => {
      axios.put('/user', {
        firstName: 'angry',
        lastName: 'toro'
      }).then((response) => {
        assert.equal(response.data.name, 'angrytoro')
        done()
      }).catch(error => {
        done(error)
      })
    })
  })
  describe('delete method', () => {
    it('should return id=0000', (done) => {
      axios.delete('/user/0000').then((response) => {
        assert.equal(response.data.id, '0000')
        done()
      }).catch(error => {
        done(error)
      })
    })
  })

  describe('async false', () => {
    it('shoud return user id, name, age, country', (done) => {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', '/user/123/freefish?age=20&country=china', false)
      xhr.send(null)
      let response = xhr.response
      assert.equal(response.name, 'freefish')
      assert.equal(response.age, 20)
      assert.equal(response.country, 'china')
      done()
    })
  })
})

describe('fetch', () => {
  describe('get method', () => {
    it('shoud return user id, name, age, country', (done) => {
      fetch('/user/123/freefish?age=20&country=china').then(response => {
        assert.equal(response.data.id, 123)
        assert.equal(response.data.name, 'freefish')
        assert.equal(response.data.age, 20)
        assert.equal(response.data.country, 'china')
        done()
      }).catch(error => {
        done(error)
      })
    })
    it('shoud return user name, age, country', (done) => {
      fetch('/user/freefish?age=20&country=china').then(response => {
        assert.equal(response.data.name, 'freefish')
        assert.equal(response.data.age, 20)
        assert.equal(response.data.country, 'china')
        done()
      }).catch(error => {
        done(error)
      })
    })
    it('regex api', (done) => {
      fetch('/help/phone?phone=0510-5555 5555').then(response => {
        assert.equal(response.data.phone, '0510-5555 5555')
        done()
      }).catch(error => {
        done(error)
      })
    })
  })
})
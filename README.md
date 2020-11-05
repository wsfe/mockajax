# MockAjax

[![npm version](https://img.shields.io/npm/v/mockajax.svg?style=flat-square)](https://www.npmjs.org/package/mockajax)
[![Coverage Status](https://coveralls.io/repos/github/angrytoro/mockajax/badge.svg?branch=master)](https://coveralls.io/github/angrytoro/mockajax?branch=master)
[![build status](https://travis-ci.org/angrytoro/mockajax.svg?branch=master&style=flat-square)](https://travis-ci.org/angrytoro/mockajax)
[![npm downloads](https://img.shields.io/npm/dm/mockajax.svg?style=flat-square)](http://npm-stat.com/charts.html?package=mockajax)

**MockAjax** is used to api mock, it bases on **XMLHttpRequest**, so you can treat jquery or axios as http client. And **MockAjax** does not depend on any frame, so you can easy use it.
> **Remark:** only support status=200

other doc: [简体中文](https://github.com/angrytoro/mockajax/blob/master/README-zhcn.md)

# About MockAjax And Its History
Before backend api is finished, frontend usually need to mock by himself. Now in github some open source api platform(such as:[easy-mock](https://github.com/easy-mock/easy-mock),[yapi](https://github.com/YMFE/yapi)) provide api mock. But they can't meet all needs, such as api2 depends on api1's mock data.

The most famous mock data frame is [jquery-mockjax](https://github.com/jakerella/jquery-mockjax), But it depends on Jquery, and not fit for axios and other http client. So, we need a frame to provide api mock, and it doesn't depend on any frame.

# Start
## Import MockAjax Frame
```
<script src="/dist/mockajax.min.js"></script>
```
**Attention:**the frame must be import before the browser send http request.
## Write Your Mock Rules
Such as:
```
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
```
And now you can send any http request
```
axios.post('/user', {
  firstName: 'free',
  lastName: 'fish'
}).then((response) => {
  assert.equal(response.data.name, 'freefish')
}).catch(error => {
})
```

# API Methods
**MockAjax** provide 3 API.
## setBasePath
`void MockAjax.setBasePath(/* String */ path)`: the method is used to set base path. Sometimes api's prefix is too long, And we don't want to write the same prefix all the time. Now it provides the function what you need.
Such as: api's prefix is `https://github.com/api/v1`.
```
MockAjax.setBasePath('/api/v1')
```
## openFetch
`void MockAjax.openFetch()`: the method make the fetch request to be able mock. MockAjax can not mock fetch request default. So If you want to make the fetch request to be able mock, you must invoke the method.
```
MockAjax.openFetch()
fetch('/user/123/freefish?age=20&country=china').then(response => {
  assert.equal(response.data.id, 123)
  assert.equal(response.data.name, 'freefish')
  assert.equal(response.data.age, 20)
  assert.equal(response.data.country, 'china')
})
```
## beforeMock
`request Mockajax.beforeMock(function(request) { return request })`,set before mock action. you don't need to call the fuction, if you call it, you should return request object.
## afterMock
`request Mockajax.afterMock(function(response) { return response })`,set after mock action. you don't need to call the fuction, if you call it, you should return response object.
## mock
`void MockAjax.mock(/* Array|Object */ options)`: the method is used to set mock rule, the argument options can be Object or Array.
**options**:
- `url`: [String | RegExp], can be Regex or normal url, and it support restful api.
- `method`: [String], can be `GET` or `POST` or `PUT`... `GET` is the default value.
- `response`: `Object Function([/* Object */ request])`: return the date what you want to mock. The method return a mock object.
  - `request`: the request object contain 4 objects: `xhr`, `query`(fit for arguments `?key=value`), `params`(fit for restful api), `body`(contain the form data), they are all Object。

# Reference
> - [xhook](https://github.com/jpillora/xhook)
> - [jquery-mockjax](https://github.com/jakerella/jquery-mockjax)
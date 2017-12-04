# MockAjax

[![npm version](https://img.shields.io/npm/v/mockajax.svg?style=flat-square)](https://www.npmjs.org/package/mockajax)
[![Coverage Status](https://coveralls.io/repos/github/angrytoro/mockajax/badge.svg?branch=master)](https://coveralls.io/github/angrytoro/mockajax?branch=master)
[![build status](https://travis-ci.org/angrytoro/mockajax.svg?branch=master&style=flat-square)](https://travis-ci.org/angrytoro/mockajax)
[![npm downloads](https://img.shields.io/npm/dm/mockajax.svg?style=flat-square)](http://npm-stat.com/charts.html?package=mockajax)

**MockAjax**是用做接口数据模拟的插件，它是基于**XMLHttpRequest**，因此没有框架限制，你可以用jQuery做http client，也可以用axios，同时**MockAjax**没有框架依赖，方便使用。

# 背景
在后端接口还没开发完成的时候，前端经常需要自己做数据模拟，虽然市面上提供了[easy-mock](https://github.com/easy-mock/easy-mock)，或者[yapi](https://github.com/YMFE/yapi)这种接口模拟平台，但是有些时候这些平台是没法满足我们的定制需求的。例如：接口2的请求参数依赖于接口1模拟出来的数据。
市面上已经有的比较出名的是[jquery-mockjax](https://github.com/jakerella/jquery-mockjax)，但是它是基于jQuery的，并不适用于axios等其他的http client。因此需要有一个脱离于http client的库来提供mock功能。

# 开始使用
## 引入mock库
```
<script src="/dist/mockajax.min.js"></script>
```
**注意:**这个库一定要ajax请求之前引用
### 编写mock规则
例如：
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

# API介绍
**MockAjax**提供2个API。
## setBasePath
`void MockAjax.setBasePath(/* String */ path)`设置基础路径。有时候接口前缀很长，我们不想在写数据模拟的时候重复的写同样的前缀，这个时候我们就可以使用这个接口。
例如：接口前缀是`https://github.com/api/v1`
```
MockAjax.setBasePath('/api/v1')
```
## mock
`void MockAjax.mock(/* Array|Object */ options)`设置mock规则，`options`可以是数组也可以是对象。
**options**:
- `url`: [String | RegExp]定义接口地址，可以是正则表达式也可以是普通的接口地址，支持restfull风格的url。
- `method`: [String]请求的方法，`GET`、`POST`或者`PUT`等，默认是`GET`
- `response`: [Function]提供生成模拟数据的方法，`MockAjax`根据这个函数生成相应的模拟数据。
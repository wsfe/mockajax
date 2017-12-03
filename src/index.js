import xhook from 'xhook'

let rules = []
let basePathRegExp = null
const PLACEHOLDER_REG = /:[^\/]+/g // 匹配restfull api中冒号开头的占位符
const QUERY_REG = /\w+=[^&]+/g //

/**
 * 将restful路由生成可与对应路径匹配的正则表达式
 * @param {*} path 
 */
function pathToRegexp(path) {
  // 先去除掉以/结尾的接口,然后把占位符用正则替换，再加上结尾
  let regStr = '^' + path.replace(/\/$/, '').replace(PLACEHOLDER_REG, '([^\\/]+?)') + '\\/?$'
  return new RegExp(regStr, 'i')
}

/**
 * 根据数据对象获取数据类型
 * @param {*} obj 
 */
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

/**
 * 
 * @param {String} pathname 请求的路径
 * @param {String} method 请求方法
 */
function findRule(pathname, method) {
  return rules.find((rule) => {
    if (rule.method.toUpperCase() !== method.toUpperCase()) {
      return false
    }
    let type = getType(rule.url)
    if (type === 'String') {
      if (rule.url.indexOf(':') > -1) {
        rule.pathRegexp = rule.pathRegexp || pathToRegexp(rule.url)
        if (rule.pathRegexp.test(pathname)) {
          return true
        }
      } else if (rule.url === pathname) {
        return true
      }
    } else if (type === 'RegExp' && rule.url.test(pathname)) {
      return true
    }
    return false
  })
}

/**
 * 生成模拟数据
 */
function mock(request, rule , a) {
  request.query = getQuery(a.search)
  request.params = getParams(rule, a.pathname);
  return rule.response(request)
}

/**
 * 将get的查询条件由?key1=value1&key2=value2变成{key1: value1, key2: value2}
 * @param {*} query 
 */
function getQuery(query = '') {
  let queryMatches = query.match(QUERY_REG)
  if (!queryMatches) {
    return {}
  } else {
    let queryObj = {}
    queryMatches.forEach((item) => {
      let kv = item.split('='),
        key = kv[0],
        value = kv.splice(1).join('=')
      queryObj[key] = value
    })
    return queryObj
  }
}

/**
 * 对于restful接口 生成相应的参数
 * @param {*} rule mock规则
 * @param {*} pathname 用户请求路径
 */
function getParams(rule, pathname) {
  if (rule.pathRegexp) {
    let params = {},
      urlMatches = rule.url.match(PLACEHOLDER_REG),
      pathMatches = pathname.match(rule.pathRegexp);
    urlMatches.forEach((value, index) => {
      params[value.substr(1)] = pathMatches[index + 1]
    })
    return params
  }
  return {}
}

xhook.before((request, cb) => {
  let a = document.createElement('a')
  a.href = request.url
  let pathname = a.pathname.replace(basePathRegExp),
    rule = findRule(pathname, request.method)
  if (rule) {
    let mockData = JSON.stringify(mock(request, rule , a))
    cb({
      headers: request.headers,
      status: 200,
      statusText: 'OK',
      text: mockData,
      data: mockData
    })
  } else {
    cb()
  }
})

/**
 * 将规则加入缓存
 * @param {*} rule 
 */
function appendToRule(rule) {
  let type = getType(rule.url)
  if (type === 'String' && !/^\/[^\/]/.test(rule.url)) {
    console.error(`${rule.url} must start with /, such as /${rule.url}`)
  } else {
    if (!rule.method) {
      rule.method = 'GET'
    }
    rules.push(rule)
  }
}

module.exports = {
  setBasePath(basePath) {
    basePathRegExp = new RegExp(basePath)
  },
  mock(config) {
    let type = getType(config)
    if (type === 'Object') {
      appendToRule(config)
    } else if (type === 'Array') {
      config.forEach((rule) => {
        appendToRule(rule)
      })
    }
  }
}
import xhook from 'xhook'

let rules = {}
let basePathRegExp = null

function findRule(pathname, method) {
  for (let key in rules) {
    let type = Object.prototype.toString.call(key).slice(8, -1)
    if (type === 'String') {
      
    } else if (type === 'RegExp') {

    }
  }
}

xhook.before((request, cb) => {
  let url = new URL(request.url),
    pathname = url.pathname.replace(basePathRegExp)
  let rule = findRule(pathname, request.method)
  // cb({
  //   headers: request.headers,
  //   status: 200,
  //   statusText: 'OK',
  //   text: '',
  //   data: ''
  // })
})

xhook.after((request, response) => {
  console.log('after');
})

export default {
  setBasePath(basePath) {
    basePathRegExp = new RegExp(basePath)
  },
  mock(config) {
    rules[config.url] = config
  }
}

let _fetch = window.fetch

let fetch = (...args) => {
  let request = new Request(...args)
  let mockData = mock(request);
  if (mockData) {
    return new Promise((resolve, reject) => {
      resolve(mockData)
    })
  } else {
    return _fetch(request)
  }
}

let mock = function(request) {
  return false
}

export default (cb) => {
  mock = cb
  window.fetch = fetch
}
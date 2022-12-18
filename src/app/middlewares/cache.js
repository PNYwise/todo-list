const NodeCache = require("node-cache")
const cache = new NodeCache();

module.exports = duration => (req, res, next) => {
     const key = req.originalUrl
     if (req.method !== 'GET') {
          cache.del(cache.keys())
          return next()
     }
     const cachedResponse = cache.get(key)

     if (cachedResponse) {
          res.send(cachedResponse)
     } else {
          res.originalSend = res.send
          res.send = body => {
               res.originalSend(body)
               cache.set(key, body, duration)

          }
          next()
     }
}
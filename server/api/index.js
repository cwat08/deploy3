const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

router.use('/pictures', require('./pictures'))

router.use('/stickers', require('./stickers'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

const router = require('express').Router()

router.route('/').get((req, res) => {
  return res.status(200).send('<h1>Hello welcome to ecommerce</h1>')
})

module.exports = router
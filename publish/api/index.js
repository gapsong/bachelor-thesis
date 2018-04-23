const express = require('express')
const router = express.Router()
const soController = require('./stackoverflow')

router.get('/', function (req, res) {
  res.json({
    data: {
      fake: 'foo',
      mock: 'bar'
    }
  })
})

router.get('/stackoverflow/:uid/tags', soController.getTags)

router.get('/stackoverflow/:uid/questions', soController.getQuestionScore)

router.get('/stackoverflow/:uid/answers', soController.getAnswerScore)

module.exports = router

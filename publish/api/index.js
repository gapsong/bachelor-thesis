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

router.get('/stackoverflow/:uid/topQuestionTags', soController.getTopQuestionTags)

router.get('/stackoverflow/:uid/topAnswerTags', soController.getTopAnswerTags)

router.get('/stackoverflow/:uid/reputationScore', soController.getReputationScore)

router.get('/stackoverflow/:uid/questions', soController.getQuestionScore)

router.get('/stackoverflow/:uid/answers', soController.getAnswerScore)

module.exports = router

const express = require('express')
const router = express.Router()
const soController = require('./stackoverflow')
const githubController = require('./github')

router.get('/', function (req, res) {
  res.json({
    data: {
      fake: 'foo',
      mock: 'bar'
    }
  })
})

router.get('/stackoverflow/:uid/topquestiontags', soController.getTopQuestionTags)

router.get('/stackoverflow/:uid/topanswertags', soController.getTopAnswerTags)

router.get('/stackoverflow/:uid/user', soController.getUser)

router.get('/github/:uid/mergedpullrequests', githubController.getMergedPullRequests)

// router.get('/github/:uid/pullrequests', githubController.pullrequests)
//
// router.get('/github/:uid/codequality', githubController.codequality)

module.exports = router

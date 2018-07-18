const express = require('express')
const router = express.Router()
const soController = require('./stackoverflow')
const soControllerMetric = require('./stackoverflowMetric')
const githubController = require('./github')
const metricController = require('./metric')
const teamscaleController = require('./teamscale')
require('dotenv').load();

router.get('/', function (req, res) {
  res.json({
    data: {
      fake: 'foo',
      mock: 'bar'
    }
  })
})

router.get('/teamscale', teamscaleController.getTeamscale)

router.post('/teamscale/repo', teamscaleController.analyzeRepo)

router.get('/stackoverflow/:uid/topquestiontags', soController.getTopQuestionTags)

router.get('/stackoverflow/:uid/acceptedanswers', soController.getAcceptedAnswers)

router.get('/stackoverflow/:uid/topanswertags', soController.getTopAnswerTags)

router.get('/stackoverflow/:uid', soController.getUser)

router.get('/stackoverflow/:uid/qualityofwork', soControllerMetric.qualityOfWork)

router.get('/metric/:uid', metricController.getMetric)

router.get('/github/:uid/qualityofwork', soControllerMetric.qualityOfWork)

router.get('/github/:uid/mergedpullrequests', githubController.getMergedPullRequests)

router.get('/github/:uid/langs', githubController.getLangs)

router.get('/github/:uid', githubController.getUser)

router.get('/github/:uid/followers', githubController.getFollowers)

router.get('/github/:uid/repos', githubController.getRepos)

router.get('/github/:uid/commits', githubController.getCommits)

router.get('/github/:uid/issues', githubController.getIssues)

router.get('/github/:uid/comments', githubController.getComments)

// router.get('/github/:uid/pullrequests', githubController.pullrequests)
//
// router.get('/github/:uid/codequality', githubController.codequality)

module.exports = router

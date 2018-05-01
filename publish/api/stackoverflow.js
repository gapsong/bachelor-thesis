var rp = require('request-promise')
const stackexchangeAPI = 'https://api.stackexchange.com/2.2'

function request (uri) {
  return rp({
    uri: uri,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    gzip: true,
    json: true // Automatically parses the JSON string in the response
  })
}

exports.getTopQuestionTags = function (req, res) {
  // request tostackoverflow to get all the answers
  return request(stackexchangeAPI + '/users/' + req.params.uid + '/top-question-tags?site=stackoverflow').then((answers) => {
    return res.json(answers)
  })
}

exports.getTopAnswerTags = function (req, res) {
  // request tostackoverflow to get all the answers
  return request(stackexchangeAPI + '/users/' + req.params.uid + '/top-answer-tags?site=stackoverflow').then((answers) => {
    return res.json(answers)
  })
}

exports.getQuestionScore = function (req, res) {
  return request(stackexchangeAPI + '/users/' + req.params.uid + '/questions?order=desc&sort=activity&site=stackoverflow').then((item) => {
    return res.json(item)
  })
}

exports.getReputationScore = function (req, res) {
  return request(stackexchangeAPI + '/users/' + req.params.uid + '?order=desc&sort=reputation&site=stackoverflow').then((item) => {
    return res.json(item)
    // res.json(item.items[0].reputation)
  })
}

exports.getAnswerScore = function (req, res) {
  return request(stackexchangeAPI + '/users/' + req.params.uid + '/answers?order=desc&sort=activity&site=stackoverflow').then((item) => {
    return res.json(item)
  })
}
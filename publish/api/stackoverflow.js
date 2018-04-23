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

exports.getTags = function (req, res) {
  // request tostackoverflow to get all the answers
  return request(stackexchangeAPI + '/users/' + req.params.uid + '/answers?order=desc&sort=activity&site=stackoverflow').then((answers) => {
    return Promise.all(answers.items.map((item) => {
      return request(stackexchangeAPI + '/questions/' + item.question_id + '?order=desc&sort=activity&site=stackoverflow')
    })).then((item) => {
      return res.json(item)
    })
  })
}

exports.getQuestionScore = function (req, res) {
  request(stackexchangeAPI + '/users/' + req.params.uid + '/questions?order=desc&sort=activity&site=stackoverflow').then((item) => {
    console.log(item)
    res.json(item)
  })
}

exports.getAnswerScore = function (req, res) {
  request(stackexchangeAPI + '/users/' + req.params.uid + '/answers?order=desc&sort=activity&site=stackoverflow').then((item) => {
    console.log(item)
    res.json(item)
  })
}

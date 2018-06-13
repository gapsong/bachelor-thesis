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

function downloadAll(acc, url, page){
  return request(url + '/answers?page='+ page +'&pagesize=100&order=desc&sort=activity&site=stackoverflow&key=' + process.env.SO_SECRET).then((answer) => {
    console.log(acc)
    if(!answer.has_more || answer.quota_remaining == 0)
      return acc.concat(answer.items)
    else
      return downloadAll(acc.concat(answer.items), url, page + 1)
  })
}

exports.getTopQuestionTags = function (req, res) {
  // request tostackoverflow to get all the answers
  return request(stackexchangeAPI + '/users/' + req.params.uid + '/top-question-tags?site=stackoverflow&key=' + process.env.SO_SECRET).then((answers) => {
    return res.json(answers)
  })
}

exports.getTopAnswerTags = function (req, res) {
  // request tostackoverflow to get all the answers
  return request(stackexchangeAPI + '/users/' + req.params.uid + '/top-answer-tags?site=stackoverflow&key='  + process.env.SO_SECRET).then((answers) => {
    return res.json(answers)
  })
}

exports.getAcceptedAnswers = function (req, res) {
  // request tostackoverflow to get all the answers
  // TODO works but has to iterate through all pages for all requests only 30 per page
  var uri = stackexchangeAPI + '/users/' + req.params.uid
  return downloadAll([], uri, 1).then((answers) => {
    return res.json(answers)
  })
}

// exports.getAcceptedAnswers = function (req, res) {
//   // request tostackoverflow to get all the answers
//   // TODO works but has to iterate through all pages for all requests only 30 per page
//   return request(stackexchangeAPI + '/users/' + req.params.uid + '/answers?order=desc&sort=activity&site=stackoverflow').then((answers) => {
//     return res.json(answers)
//   })
// }

exports.getUser = function (req, res) {
  return request(stackexchangeAPI + '/users/' + req.params.uid + '?order=desc&sort=reputation&site=stackoverflow' + process.env.SO_SECRET).then((item) => {
    return res.json(item)
  })
}

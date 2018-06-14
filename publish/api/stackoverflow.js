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
  var uri =  url + '?page='+ page +'&pagesize=100&site=stackoverflow&key=' + process.env.SO_SECRET
  return request(uri).then((answer) => {
    if(!answer.has_more || answer.quota_remaining == 0)
      return acc.concat(answer.items)
    else
      return downloadAll(acc.concat(answer.items), url, page + 1)
  })
}

function startDownload(url){
  return downloadAll([], url, 1)
}

exports.getTopQuestionTags = function (req, res) {
  var uri = stackexchangeAPI + '/users/' + req.params.uid + '/top-question-tags'

  return startDownload(uri).then((answers) => {
    return res.json(answers)
  })
}

exports.getTopAnswerTags = function (req, res) {
  var uri = stackexchangeAPI + '/users/' + req.params.uid + '/top-answer-tags'

  return startDownload(uri).then((answers) => {
    return res.json(answers)
  })
}

exports.getAcceptedAnswers = function (req, res) {
  var uri = stackexchangeAPI + '/users/' + req.params.uid + '/answers'

  return startDownload(uri).then((answers) => {
    return res.json(answers.filter((item) => {
      return item.is_accepted
    }))
  })
}

exports.getUser = function (req, res) {
  var uri = stackexchangeAPI + '/users/' + req.params.uid

  return startDownload(uri).then((user) => {
    return res.json(user)
  })
}

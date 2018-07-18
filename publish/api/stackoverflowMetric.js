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

function getTopQuestionTags(uid) {
  var uri = stackexchangeAPI + '/users/' + uid + '/top-question-tags'

  return startDownload(uri).then((answers) => {
    return res.json(answers)
  })
}

function getTopAnswerTags(uid) {
  var uri = stackexchangeAPI + '/users/' + uid + '/top-answer-tags'

  return startDownload(uri).then((answers) => {
    return answers
  })
}

function getAcceptedAnswers(uid) {
  var uri = stackexchangeAPI + '/users/' + uid + '/answers'

  return startDownload(uri).then((answers) => {
    return answers.filter((item) => {
      return item.is_accepted
    }).length
  })
}

function getUser(uid) {
  var uri = stackexchangeAPI + '/users/' + uid

  return startDownload(uri).then((user) => {
    return user
  })
}

function getReputationScore(uid) {
  var uri = stackexchangeAPI + '/users/' + uid

  return startDownload(uri).then((user) => {
    return user[0].reputation
  })
}

exports.qualityOfWork = function (req, res) {
  var uid = req.params.uid
  return Promise.all([getAcceptedAnswers(uid), getReputationScore(uid)])
    .then(values => {
      return res.json(values)
    });
}

var rp = require('request-promise')
const githubAPI = 'https://api.github.com/'

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

exports.getMergedPullRequests = function (req, res) {
  // request tostackoverflow to get all the answers
  return request(githubAPI + 'search/issues?q=author:' + req.params.uid + '+state:closed+is:pr+is:merged&sort=created&order=asc').then((answers) => {
    return res.json(answers)
  })
}

// exports.getTopAnswerTags = function (req, res) {
//   // request tostackoverflow to get all the answers
//   return request(githubAPI + '/users/' + req.params.uid + '/top-answer-tags?site=stackoverflow').then((answers) => {
//     return res.json(answers)
//   })
// }
//
// exports.getUser = function (req, res) {
//   return request(githubAPI + '/users/' + req.params.uid + '?order=desc&sort=reputation&site=stackoverflow').then((item) => {
//     return res.json(item)
//   })
// }

// get all merged pull requests
// docs https://developer.github.com/v3/search/#search-issues
// curl https://api.github.com/search/issues?q=author:gapsong+state:closed+is:pr+is:merged&sort=created&order=asc

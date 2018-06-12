var rp = require('request-promise')
const githubAPI = 'https://api.github.com/'
var dotenv = require('dotenv')

function request(uri) {
  return rp({
    uri: uri,
    headers: {
      'User-Agent': 'Request-Promise',
      Authorization: process.env.TOKEN_SECRET
    },
    gzip: true,
    json: true // Automatically parses the JSON string in the response
  })
}

exports.getMergedPullRequests = function(req, res) {
  // request tostackoverflow to get all the answers
  return request(githubAPI + 'search/issues?q=author:' + req.params.uid + '+state:closed+is:pr+is:merged&sort=created&order=asc').then((answers) => {
    return res.json(answers)
  })
}

exports.getUser = function(req, res) {
  // request tostackoverflow to get all the answers
  return request(githubAPI + 'users/' + req.params.uid).then((user) => {
    console.log(user)
    return res.json(user)
  })
}

function getRepos(uid){
  return request(githubAPI + 'users/' + uid + '/repos').then((repos) => {
    return repos
  })
}

exports.getRepos = function(req, res) {
  // request tostackoverflow to get all the answers
  return getRepos(req.params.uid).then((repos) => {
    return res.json(repos)
  })
}

var GitHubCommits = require('github-commits')
var gitHubCommits = new GitHubCommits()

exports.getCommits = function(req, res) {
  return gitHubCommits.forUser(req.params.uid).commitsUntil('2020-12-31T23:59:59Z').sumCommits(function(sum) {
    return res.json(sum)
  })
}

function getIssues(uid){
  return request(githubAPI + 'users/' + uid + '/repos').then((repos) => {
    return Promise.all(repos.map((item) => {
      return request(githubAPI + 'repos/' + uid + '/' + item.name + '/issues?creator=' + uid)
    })).then((issues) => {
      return issues.reduce((acc, cur) => {
        return cur.concat(acc)
      }, [])
    })
  })
}

exports.getIssues = function(req, res) {
  return getIssues(req.params.uid).then((issues) => {
      return res.json(issues)
  })
}

function getCommentsFromIssues(uid){
  return getIssues(uid).then((issues) => {
    return Promise.all(issues.map((item) => {
      return request(item.url + '/comments')
    })).then((issues) => {
      var temp = issues.reduce((acc, cur) => {
        return cur.concat(acc)
      }, [])
      return temp
    })
  })
}

function getCommentsFromRepos(uid){
  return getRepos(req.params.uid).then((repos) => {
    return repos
  })
}

exports.getComments = function(req, res) {
  // https://api.github.com/search/issues?q=commenter:gapsong
  return request(githubAPI + 'search/issues?q=commenter:' + req.params.uid).then((comments) => {
    // return res.json(comments)
    return Promise.all(comments.items.map((item) => {
      return request(item.comments_url)
    })).then((comments) => {
      var temp = comments.reduce((acc, cur) => {
        cur = cur.filter((item) => {
          // console.log(item.user.login, req.params.uid)
          return (req.params.uid == item.user.login)
        })
        return acc.concat(cur)
      }, [])

      return res.json(temp)
    })
  })
}

// exports.getTopAnswerTags = function (req, res) {
//    request tostackoverflow to get all the answers
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

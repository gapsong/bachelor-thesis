var rp = require('request-promise')
const githubAPI = 'https://api.github.com'

function request(uri) {
  return rp({
    uri: uri,
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': process.env.TOKEN_SECRET,
      'Accept': 'application/vnd.github.cloak-preview, application/vnd.github.symmetra-preview+json'
    },
    gzip: true,
    json: true // Automatically parses the JSON string in the response
  })
}

function downloadAll(acc, url, params, page){
  var uri =  githubAPI + url + '?page=' + page + '&per_page=100' + params
  return request(uri).then((response) => {
    if(response.items.length == 0)
      return acc.concat(response.items)
    else
      return downloadAll(acc.concat(response.items), url, params, page + 1)
  })
}

exports.getMergedPullRequests = function(req, res) {
  // request tostackoverflow to get all the answers
  // https://api.github.com/search/issues?q=author:paulmillr+state:closed+is:pr+is:merged&page=3&per_page=100&sort=created&order=asc%27
  var uri = '/search/issues'
  var params = '&q=author:' + req.params.uid + '+state:closed+is:pr+is:merged&sort=created&order=asc'
  return downloadAll([], uri, params, 1).then((answers) => {
    return res.json(answers)
  })
}

exports.getUser = function(req, res) {
  // request tostackoverflow to get all the answers
  return request(githubAPI + '/users/' + req.params.uid).then((user) => {
    return res.json(user)
  })
}

exports.getFollowers = function(req, res) {
  // request tostackoverflow to get all the answers
  return request(githubAPI + '/users/' + req.params.uid).then((user) => {
    return res.json(user.followers)
  })
}

function getRepos(acc, url, page) {
  var uri =  githubAPI + url + '?page=' + page + '&per_page=100'
  return request(uri).then((response) => {
    if(response.length == 0)
      return acc.concat(response)
    else
      return getRepos(acc.concat(response), url, page + 1)
  })
}

exports.getRepos = function(req, res) {
  // request tostackoverflow to get all the answers
  var url = '/users/' + req.params.uid + '/repos'
  return getRepos([], url, 1).then((answers) => {
    return res.json(answers)
  })
}

exports.getLangs = function(req, res) {
  // get repos
  return getRepos(req.params.uid).then((repos) => {
    return Promise.all(repos.map((item) => {
      return request(item.languages_url)
    })).then((languages) => {
      var temp = languages.reduce((acc, cur) => {
        return Object.assign(acc, cur)
      }, {})
      return res.json(temp)
    })
  })
}

var GitHubCommits = require('github-commits')
var gitHubCommits = new GitHubCommits()

exports.getCommits = function(req, res) {
  return gitHubCommits.forUser(req.params.uid).commitsUntil('2020-12-31T23:59:59Z').sumCommits(function(sum) {
    return res.json(sum)
  })
}

function getIssues(uid) {
  return request(githubAPI + '/users/' + uid + '/repos').then((repos) => {
    return Promise.all(repos.map((item) => {
      return request(githubAPI + '/repos/' + uid + '/' + item.name + '/issues?creator=' + uid)
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

function getCommentsFromIssues(uid) {
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

function getCommentsFromRepos(uid) {
  return getRepos(req.params.uid).then((repos) => {
    return repos
  })
}

exports.getComments = function(req, res) {
  // https://api.github.com/search/issues?q=commenter:gapsong
  return request(githubAPI + '/search/issues?q=commenter:' + req.params.uid + '&per_page=100').then((comments) => {
    // return res.json(comments)
    return Promise.all(comments.items.map((item) => {
      return request(item.comments_url)
    })).then((comments) => {
      var temp = comments.reduce((acc, cur) => {
        cur = cur.filter((item) => {
          return (req.params.uid == item.user.login)
        })
        return acc.concat(cur)
      }, [])

      return res.json(temp)
    })
  })
}

exports.getCommits = function(req, res) {
  var uri = '/search/commits?q=author-name:'
  var params = '?q=author-name:' + req.params.uid + '&merge:true'
  return downloadAll([], uri, params, 1).then((answers) => {
    return res.json(answers)
  })
}

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

// returns object in wrapper
// function downloadAllWrapper(acc, url, params, page){
//   var uri =  githubAPI + url + '?&page=' + page + '&per_page=99' + params
//   return request(uri).then((response) => {
//     if(response.items.length == 0 || page == 10) 10 pages is max
//       return acc.concat(response.items)
//     else
//       return downloadAllWrapper(acc.concat(response.items), url, params, page + 1)
//   })
// }

//returns object in array
function downloadAll(acc, url, page) {
  var uri = githubAPI + url + '?&page=' + page + '&per_page=99'
  return request(uri).then((response) => {
    if (response.length == 0 || page == 10) //10 pages is max
    return acc.concat(response)
    else
    return downloadAll(acc.concat(response), url, page + 1)
  })
}

function getRepos(uid) {
  var url = '/users/' + uid + '/repos'
  var params = ''
  return downloadAll([], url, 1).then((answers) => {
    return answers
  })
}

function getMergedCommits(uid) {
  var uri = githubAPI + '/search/commits?&q=committer:' + uid + '+merge:true'
  return request(uri).then((response) => {
    return response.total_count
  })
}

function getUnmergedCommits(uid) {
  var uri = githubAPI + '/search/commits?&q=committer:' + uid + '+merge:false'
  return request(uri).then((response) => {
    return response.total_count
  })
}

function getCommits(uid) {
  var uri = githubAPI + '/search/commits?&q=committer:' + uid
  return request(uri).then((response) => {
    return response.total_count
  })
}

function getIssues(uid) {
  var uri = githubAPI + '/search/issues?&page=1&per_page=99&q=commenter:' + uid + '&sort=created&order=asc'
  return request(uri).then((response) => {
    return response.total_count
  })
}

function getCommentsIssues(uid) {
  return request(githubAPI + '/search/issues?q=commenter:' + uid + '&per_page=100').then((comments) => {
    return Promise.all(comments.items.map((item) => {
      return request(item.comments_url)
    })).then((comments) => {
      var temp = comments.reduce((acc, cur) => {
        cur = cur.filter((item) => {
          return (uid == item.user.login)
        })
        return acc.concat(cur)
      }, [])
      return temp.length
    })
  })
}

function getCommentsCommits(uid) {
  return request(githubAPI + '/search/commits?q=committer:' + uid + '&per_page=100').then((comments) => {
    return Promise.all(comments.items.map((item) => {
      return request(item.comments_url)
    })).then((comments) => {
      var temp = comments.reduce((acc, cur) => {
        cur = cur.filter((item) => {
          return (uid == item.user.login)
        })
        return acc.concat(cur)
      }, [])
      return temp.length
    })
  })
}

function getComments(uid) {
  return Promise.all([getCommentsIssues(uid), getCommentsCommits(uid)]).then(comments => {
    return comments.reduce(function(acc, cur) {
      return acc + cur
    }, 0)
  })
}

function showObject(obj) {
  var result = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      result.push(p, obj[p])
    }
  }
  return result;
}

function fold(array) {
  var temp = []
  return array.reduce((acc, cur) => {
    if (cur.hasOwnProperty(p)) {
      return Object.assign(acc, {[p]: cur[p]})
    }
  }, {})
}

function addParams(array) {
  return array.reduce((acc, item) => {
    for (var p in item) {
      if (acc.hasOwnProperty(p))
      acc[p] = acc[p] + item[p]
      else
      acc[p] = item[p]
    }
    return acc
  }, {})
}

function getTags(uid) {
  return getRepos(uid).then((repos) => {
    return Promise.all(repos.map((item) => {
      return request(item.languages_url)
    })).then((languages) => {
      return addParams(languages)
    })
  })
}

function getSize(uid) {
  return getRepos(uid).then((repos) => {
    return repos.reduce((acc, cur) => {
      return acc + cur.size
    }, 0)
  })
}

function getFollowers(uid) {
  var url = '/users/' + uid + '/followers'
  return downloadAll([], url, 1).then((followers) => {
    return followers.length
  })
}

function getMergedPullRequests(uid) {
  return request('https://api.github.com/search/issues?&page=1&per_page=99&q=type:pr+involves:'+ uid +'+is:merged&sort=created&order=asc%27').then((json)=>{
    return json.total_count
  })
}

function getTotalPullRequests(uid) {
  return request('https://api.github.com/search/issues?&page=1&per_page=99&q=type:pr+involves:'+ uid +'&sort=created&order=asc%27').then((json)=>{
    return json.total_count
  })
}

exports.getMetric = function(req, res) {
  // var uid = 'gapsong' //andrew
  const avgScore = 1600
  const userSum = 15436
  const points = avgScore / 7
  // const totalsum = 2046098925 + 108306 + 1087345 + 55154 + 105027 + 1228 + 36189 + 28814

  const sizeParam = points / (2046098925 / userSum)
  const repoParam =  points / (108306 / userSum)
  const commitsParam = points / (1087345 / userSum)
  const issuesParam = points / (55154 / userSum)
  const issueCommentsParam = points / (105027 / userSum)
  const followersParam = points / (1228 / userSum)
  const mergedParam = points / (28814 / userSum)
  const unmergedParam = points / (36189 / userSum)

  var uid = req.params.uid
  return Promise.all([
    getSize(uid),
    getRepos(uid),
    getIssues(uid),
    getComments(uid),
    getTags(uid),
    getFollowers(uid),
    getMergedCommits(uid),
    getUnmergedCommits(uid),
    getMergedPullRequests(uid),
    getTotalPullRequests(uid)
  ]).then(values => {
    // TODO calculcation has to get fixed
    var splittedMetric = [
      sizeParam * values[0],
      repoParam * values[1].length,
      issuesParam * values[2],
      issueCommentsParam * values[3],
      commitsParam * (values[6] + values[7]),
      mergedParam * (values[8]),
      unmergedParam * (values[9] - values[8])
    ]
    var score = splittedMetric.reduce((item, cur) => {
      return item + cur
    }, 0)

    return res.json({
      repos: values[1],
      metric:{
        size: values[0],
        issues: values[2],
        comments: values[3],
        tags: values[4],
        followers: values[5],
        commits: values[6] + values[7],
        mergedPR: values[8],
        unmergedPR: values[9] - values[8],
        simpleMetric:
        Math.round(score),
        splittedMetric: splittedMetric
      }})
    })
  }

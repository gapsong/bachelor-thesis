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

// //returns object in wrapper
// function downloadAllWrapper(acc, url, params, page){
//   var uri =  githubAPI + url + '?&page=' + page + '&per_page=99' + params
//   return request(uri).then((response) => {
//     if(response.items.length == 0 || page == 10) //10 pages is max
//       return acc.concat(response.items)
//     else
//       return downloadAllWrapper(acc.concat(response.items), url, params, page + 1)
//   })
// }

//returns object in array
function downloadAll(acc, url, page){
  var uri =  githubAPI + url + '?&page=' + page + '&per_page=99'
  return request(uri).then((response) => {
    if(response.length == 0 || page == 10) //10 pages is max
      return acc.concat(response)
    else
      return downloadAll(acc.concat(response), url, page + 1)
  })
}

function getRepos(uid){
  var url = '/users/' + uid + '/repos'
  var params = ''
  return downloadAll([], url, 1).then((answers) =>{
    return answers
  })
}

function getCommits(uid){
  var uri = githubAPI + '/search/commits?&q=committer:' + uid + '&merge:true'
  return request(uri).then((response) => {
    return response.total_count
  })
}

function getIssues(uid){
  var uri = githubAPI + '/search/issues?&page=1&per_page=99&q=commenter:'+ uid +'&sort=created&order=asc'
  return request(uri).then((response) => {
    return response.total_count
  })
}

function getComments(uid){
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

function showObject(obj) {
  var result = [];
  for (var p in obj) {
    if( obj.hasOwnProperty(p) ) {
      result.push(p, obj[p])
    }
  }
  return result;
}

function fold(array) {
  var temp = []
  return array.reduce((acc, cur) => {
    if(cur.hasOwnProperty(p)) {
      return Object.assign(acc, {[p]:cur[p]})
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


function getTags(uid){
  return getRepos(uid).then((repos) => {
    return Promise.all(repos.map((item) => {
      return request(item.languages_url)
    })).then((languages) => {
      return addParams(languages)
    })
  })
}

exports.getMetric = function (req, res) {
  var uid = 'gapsong' //andrew

  return Promise.all([getRepos(uid), getCommits(uid), getIssues(uid), getComments(uid), getTags(uid)])
    .then(values => {
      return res.json(values)
    });
}

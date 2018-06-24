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

//returns object in wrapper
function downloadAllWrapper(acc, url, params, page){
  var uri =  githubAPI + url + '?&page=' + page + '&per_page=99' + params
  return request(uri).then((response) => {
    if(response.items.length == 0 || page == 10) //10 pages is max
      return acc.concat(response.items)
    else
      return downloadAllWrapper(acc.concat(response.items), url, params, page + 1)
  })
}

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
  var uri = '/search/commits'
  var params = '&q=author-name:' + uid + '&merge:true'
  return downloadAllWrapper([], uri, params, 1).then((answers) => {
    return answers
  })
}

function getIssues(uid){
  var uri = '/search/commits'
  var params = '&q=author-name:' + uid
  return downloadAllWrapper([], uri, params, 1).then((answers) => {
    return answers
  })
}

exports.getMetric = function (req, res) {
  var uid = 'gapsong' //andrew

  return Promise.all([getRepos(uid), getCommits(uid), getIssues(uid)])
    .then(values => {
      return res.json(values)
    });
}

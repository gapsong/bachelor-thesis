var rp = require('request-promise')
const teamscaleAPI = 'http://localhost:8081/p/wrapmachine/metric-schema/'

// curl http://localhost:8080/p/wrapmachine/metric-schema

function request(uri, payload) {
  return rp({
      method: 'PUT',
      uri: uri,
      headers: {
        'Accept': 'application/json',
        'Authorization': process.env.TEAM_SCALE_SECRET,
      },
      body: payload,
      json: true // Automatically stringifies the body to JSON
  })
}

function request2(uri, payload) {
  return rp({
      method: 'Get',
      uri: uri,
      headers: {
        'Accept': 'application/json',
        'Authorization': process.env.TEAM_SCALE_SECRET,
      },
      body: payload,
      json: true // Automatically stringifies the body to JSON
  })
}

function post(uri) {
  return rp({
    uri: uri,
    headers: {
      'Accept': 'application/json',
      'Authorization': process.env.TEAM_SCALE_SECRET,
    }
  })
}

exports.getTeamscale = function(req, res) {
  return request2("http://localhost:8081/post-commit-hook?user=admin&access-token=P40AEEWnRlSsghfZ0CayO10uuS39TaNr&repository=a225dba4d20815041a047c47afd21cc6be18e171").then((response) =>{
    return res.send(response)
  })
}

//TODO hier dran
function createAccount(repourl) {
  var hashedrepo = hash({repo:repourl})
  return request("http://localhost:8081/options/server?name=account.credentials%2F" + hashedrepo + "&saveIfValidationFails=false",
  {url: repourl,  username:"", password:""}).then(()=>{
      return hashedrepo
  })
}

function getMetrics(hash) {
  return request("http://localhost:8081/p/" + hash +"/metrics").then((item) => {
    return item
  })
}

function getMetricSchema(hash) {
  return request("http://localhost:8081/p/" + hash +"/metric-schema").then((item) => {
    return item
  })
}

var createAcc = require("./createAcc")

function createProfile(hash){
  return request("http://localhost:8081/create-project/", createAcc.jsRequest(hash)).then(() => {
    return hash
  })
}

var hash = require('object-hash')

exports.analyzeRepo = function(req, res) {
  // var repo = "https://github.com/Code-Connect/CodeConnect.git"
  var repo = req.body.repoLink
  return createAccount(repo).then((hash) => {
    return createProfile(hash)
  }).then((hash) => {
    return Promise.all([getMetrics(hash), getMetricSchema(hash)]).then((item) => {
      var temp = item[1].entries.map((entries, index) => {
        return {[entries.name]: item[0].metricValues[index]}
      })
      return res.send(temp) //TODO merge the metric
    })
  })
}

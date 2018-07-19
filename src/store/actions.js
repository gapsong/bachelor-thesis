import 'whatwg-fetch'
export default {
  REGISTER (context, userId) {
    context.commit('REGISTER', userId)
  },
  FETCH_TAGS (context) {
    return fetch('/api/stackoverflow/1447296/topanswertags').then(function (response) {
      return response.json()
    }).then(function (tags) {
      return context.commit('FETCH_TAGS', tags)
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
  },
  FETCH_SO_USER (context, uid) {
    return fetch('/api/stackoverflow/' + uid).then(function (response) {
      return response.json()
    }).then(function (json) {
      return context.commit('FETCH_SO_USER', json[0])
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
  },
  FETCH_GIT_USER (context, uid) {
    return fetch('/api/github/gapsong').then(function (response) {
      return response.json()
    }).then(function (json) {
      return context.commit('FETCH_GIT_USER', json)
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
  },
  FETCH_METRIC (context, uid) {
    console.log('fetch', uid)
    return fetch('/api/metric/' + uid).then(function (response) {
      return response.json()
    }).then(function (json) {
      console.log(json)
      return context.commit('FETCH_METRIC', json)
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
  },
  FETCH_TEAMSCALE_REPO (context, repoLink) {
    return fetch('/api/teamscale/repo', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        repoLink: repoLink
      })
    }).then(function (response) {
      return response.json()
    }).then(function (repoMetrics) {
      return context.commit('FETCH_TEAMSCALE_REPO', {repoLink: repoLink, repoMetrics:repoMetrics})
    })
  }
}

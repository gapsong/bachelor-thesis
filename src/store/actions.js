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
  FETCH_SO_USER (context) {
    return fetch('/api/stackoverflow/1447296').then(function (response) {
      return response.json()
    }).then(function (json) {
      return context.commit('FETCH_SO_USER', json)
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
      return context.commit('FETCH_METRIC', json)
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
  }
}

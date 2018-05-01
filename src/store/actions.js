import 'whatwg-fetch'
export default {
  REGISTER (context, userId) {
    context.commit('REGISTER', userId)
  },
  FETCHTAGS (context) {
    fetch('/api/stackoverflow/1447296/topquestiontags').then(function (response) {
      return response.json()
    }).then(function (tags) {
      context.commit('FETCHTAGS', tags)
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
  }
}

export default {
  REGISTER: function (state, userId) {
    return state.registrations.push(userId)
  },
  FETCH_TAGS: function (state, res) {
    return state.toptags.push(res.items)
  },
  FETCH_SO_USER: function (state, res) {
    state.soUser = res.items
    return state
  },
  FETCH_GIT_USER: function (state, json) {
    state.gitUser = json
    return state
  }
}

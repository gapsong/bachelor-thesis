export default {
  REGISTER: function (state, userId) {
    return state.registrations.push(userId)
  },
  FETCHTAGS: function (state, toptagsWrap) {
    return state.toptags.push(toptagsWrap.items)
  }
}

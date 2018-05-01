export default {
  nameUsers (state) {
    return state.users.map(item => {
      return item.name
    })
  },
  users (state) {
    return state.users
  },
  registrations (state) {
    return state.registrations
  },
  toptags (state) {
    return state.toptags
  }
}

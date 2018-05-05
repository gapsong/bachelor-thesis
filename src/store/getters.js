export default {
  nameUsers (state) {
    return state.users.map(item => {
      return item.name
    })
  },
  soUser (state) {
    return state.soUser[0]
  },
  registrations (state) {
    return state.registrations
  },
  toptags (state) {
    return state.toptags[0]
  },
  gitUser (state) {
    return state.gitUser
  },
  users (state) {
    return {}
  }
}

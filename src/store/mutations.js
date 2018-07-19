export default {
  REGISTER: function (state, userId) {
    return state.registrations.push(userId)
  },
  FETCH_TAGS: function (state, res) {
    return state.toptags.push(res.items)
  },
  FETCH_SO_USER: function (state, json) {
    state.soUser = json
    return state
  },
  FETCH_GIT_USER: function (state, json) {
    state.gitUser = json
    return state
  },
  FETCH_METRIC: function (state, json) {
    state.metric = json.metric
    state.repos = json.repos
    return Object.assign({}, state)
  },
  FETCH_TEAMSCALE_REPO: function(state, metricWrapper) {
    state.repos = state.repos.map((item) => {
      if (item.clone_url == metricWrapper.repoLink){
        return Object.assign(item, {repoMetrics: metricWrapper.repoMetrics})
      }else{
        return item
      }
    })
    return Object.assign({}, state)
  }
}

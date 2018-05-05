<template>
<div class="hello">
  <h1>Github</h1>
  <h2>
    <a v-bind:href="user.html_url"> {{ user.login }} </a>
  </h2>
  <img class="image" :src="user.avatar_url">
  <GitHubFeed login="gapsong"></GitHubFeed>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
// import Activity from './Activity'
// import Activity from './Activity'
import GitHubFeed from './GithubFeed'

export default {
  components: {
    GitHubFeed
    // Activity
  },
  computed: {
    ...mapGetters({
      user: 'gitUser'
    })
  },
  beforeMount: function () {
    this.$store.dispatch('FETCH_GIT_USER')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .image {
    height: 150px;
    width: 150px;
  }
</style>

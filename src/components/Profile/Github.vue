<template>
<div class="hello">
  <GitHubFeed login="gapsong"></GitHubFeed>
  <h3>1000</h3>
  <VuejsHeatmap/>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import GitHubFeed from './GithubFeed'

export default {
  components: {
    GitHubFeed
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
  .github-octicon {
      font: normal normal 40px 'octicons'
  }
  .github-icon {
      display: inline;
      float: left;
      padding: 9px 0 0;
      width: 35px;
      height: 35px;
  }
</style>

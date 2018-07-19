<template>
  <b-card>
    <h1>GithubMetric</h1>
    <input v-model="githubName" placeholder="Type in Name">
    <p>User is: {{ githubName }}</p>
    <button v-on:click="onClick(githubName)">get User</button>
    <hr/>
    <h2>Simplemetric is: {{computeSimpleMetric}}</h2>
    <div>Size: {{metric.size}}</div>
    <div>Issues: {{metric.issues}}</div>
    <div>Comments: {{metric.comments}}</div>
    <div>Tags: {{metric.tags}}</div>
    <div>Followers: {{metric.followers}}</div>
    <div>Commits: {{metric.commits}}</div>
    <hr/>
    <h3>Repositories</h3>
    <Repositories />
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Repositories from './Repositories'

export default {
  components:{
    Repositories
  },
  data () {
    return {
      githubName: 'gapsong'
    }
  },
  computed: {
    ...mapGetters(['users', 'registrations', 'metric']),
    computeSimpleMetric: function () {
      // `this` points to the vm instance
      return this.metric.size * 0.001 +
      // this.metric.repos.length +
      this.metric.issues +
      this.metric.comments +
      this.metric.followers +
      this.metric.unmergedCommits +
      this.metric.mergedCommits * 2
    }
  },
  methods: {
    onClick(githubName) {
      this.$store.dispatch('FETCH_METRIC', githubName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

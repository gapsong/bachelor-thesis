<template>
  <b-card>
    <h1>Technical Metric</h1>
    <input v-model="githubName" placeholder="Type in Name">
    <p>User is: {{ githubName }}</p>
    <button v-on:click="onClick(githubName)">get Github User</button>
    <hr/>
    <h2>TechnicalScore is: {{metric.simpleMetric}}</h2>
    <LineChart :name="githubName" :data="metric.splittedMetric" :options="{responsive: true, maintainAspectRatio: false}" :height="50"/>
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
import LineChart from './LineChart'

export default {
  components:{
    Repositories,
    LineChart
  },
  data () {
    return {
      githubName: 'gapsong'
    }
  },
  computed: {
    ...mapGetters(['metric'])
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

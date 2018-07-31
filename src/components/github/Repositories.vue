<template>
  <div>
    <b-table :items="repos" :fields="fields">
      <template slot="show_details" slot-scope="row">
        <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
        <b-button size="sm" @click="analyzeRepo(row.item.clone_url)" @click.stop="row.toggleDetails" class="mr-2">
         {{ row.detailsShowing ? 'Hide' : 'Show'}} Teamscale Metric
        </b-button>
        <!-- In some circumstances you may need to use @click.native.stop instead -->
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <div v-for="met in row.item.repoMetrics">
          {{met[0]}}:
          <Bar v-if="met[1].mapping != null" :data = "met[1].mapping" :height="50"/>
          <a v-else>{{met[1]}}</a>
        </div>
          <!-- {{row.item.repoMetrics}} -->
        </b-card>
      </template>
    </b-table>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Bar from './Bar'


export default {
  components:{
    Bar
  },
  data () {
    return {
      fields:['name', 'show_details']
    }
  },
  computed: {
    ...mapGetters(['repos'])
  },
  methods: {
    analyzeRepo(repoURL){
      this.$store.dispatch('FETCH_TEAMSCALE_REPO', repoURL)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

<template>
    <b-card>
      <h1>Stackoverflow Metric</h1>
      <input v-model="soID" placeholder="Type in the Stackoverflow ID">
      <p>User is: {{ soID }}</p>
      <button v-on:click="onClick(soID)">get User</button>
      <hr/>
      <h2>CommunicationScore is: {{soUser.reputation}}</h2>
    </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components:{

  },
  data () {
    return {
      soID: '9619465'
    }
  },
  computed: {
    ...mapGetters(['soUser']),
  },
  methods: {
    onClick(soID){
      this.$store.dispatch('FETCH_SO_USER', soID)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

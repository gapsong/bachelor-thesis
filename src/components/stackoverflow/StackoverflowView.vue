<template>
    <b-card>
      <h1>Stackoverflow Metric</h1>
      <input v-model="stackoverflowName" placeholder="Type in Name">
      <p>User is: {{ stackoverflowName }}</p>
      <button v-on:click="onClick(stackoverflowName)">get User</button>
    </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components:{

  },
  data () {
    return {
      stackoverflowName: 'gapsong'
    }
  },
  computed: {
    ...mapGetters([]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

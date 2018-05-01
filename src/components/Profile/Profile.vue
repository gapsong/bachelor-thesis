<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  <div>
    Top answer Tags
  </div>
  <h1>Top Tags</h1>
  <button @click="fetchTags()"> Register </button>
  <div class="row" v-for="tag in toptags">
    <h4>{{ tag }}</h4>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Username'
    }
  },
  beforeMount: function () {
    this.$store.dispatch('FETCHTAGS')
  },
  computed: {
    ...mapGetters(['toptags'])
  },
  methods: {
    fetchTags () {
      this.$store.dispatch('FETCHTAGS')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

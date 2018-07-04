<template>
  <div class="hello">
    <input v-model="githubName" placeholder="Type in Name">
    <p>User is: {{ githubName }}</p>
    <button v-on:click="onClick(githubName)">getUser</button>
    <div v-for="item of metric">
      <h3>{{item}}</h3>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      githubName: 'test path'
    }
  },
  computed: {
    ...mapGetters(['users', 'registrations', 'metric'])
  },
  methods: {
    registerUserAsync (user) {
      this.$store.dispatch('REGISTER', user.id)
    },
    onClick (githubName) {
      this.$store.dispatch('FETCH_METRIC', githubName)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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

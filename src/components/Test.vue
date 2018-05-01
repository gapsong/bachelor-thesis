<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div> {{users}} </div>
    <div> {{cars}} </div>
    <div class="row" v-for="user in users">
      <h4>{{ user.name }}</h4>
      <button @click="registerUserAsync(user)"> Register </button>
    </div>
    <div class="row" v-for="reg in registrations">
      <h4>{{ reg }}</h4>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'test path'
    }
  },
  computed: {
    ...mapGetters(['users', 'registrations']),
    cars () {
      return {car: 'auto'}
    }
  },
  methods: {
    registerUserAsync (user) {
      this.$store.dispatch('REGISTER', user.id)
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

<template>
<div id="app">
  <!-- <img src="./assets/logo.png"> -->
  <router-link :to="{ name: 'Test' }">Test</router-link>
  <router-link :to="{ name: 'Profile' }">Profile</router-link>
  <router-view/>
</div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

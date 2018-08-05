<template>
<div id="app">
  <!-- <img src="./assets/logo.png"> -->
  <!-- <router-link :to="{ name: 'Test' }">Test</router-link>
  <router-link :to="{ name: 'Profile' }">Profile</router-link>
  <router-view/> -->
  <Main/>
</div>
</template>

<script>
import Main from './components/Main'

export default {
  name: 'app',
  components: {
    Main
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
.box {
  background-color: #c1c1c1;
  padding: 25px;
}
</style>

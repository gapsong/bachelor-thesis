<template>
<div>
  <Github/>
  <hr/>
  <Stackoverflow/>
</div>
</template>

<script>
import Github from './Github'
import Stackoverflow from './Stackoverflow'

export default {
  components: {
    Github,
    Stackoverflow
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

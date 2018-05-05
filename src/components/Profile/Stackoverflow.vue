<template>
  <div>
    <h1> Stackoverflow </h1>
    <div v-if="user != undefined" class="hello">
      <h2>
        <a v-bind:href="user.link"> {{ user.display_name }} </a>
      </h2>
      <img class="image" :src="user.profile_image">
      <!-- <button @click="fetchTags()"> Register </button> -->
      <div> {{user}} </div>
      <div> {{user.badge_counts}} </div>
      <div> {{user.reputation}} </div>
      <h3>Top Tags</h3>
      <div class="row" v-for="tag in toptags">
        <h4>{{ tag.tag_name }}</h4>
        <h4>{{ tag.answer_count }}</h4>
        <h4>{{ tag.answer_score }}</h4>
      </div>
    </div>
    <div v-else>
      Tipp tool
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Username'
    }
  },
  beforeMount: function () {
    this.$store.dispatch('FETCH_TAGS')
    this.$store.dispatch('FETCH_SO_USER')
  },
  computed: {
    ...mapGetters({
      toptags: 'toptags',
      user: 'soUser'
    })
  },
  methods: {
    fetchTags () {
      this.$store.dispatch('FETCH_TAGS')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .image {
    height: 150px;
    width: 150px;
}
</style>


<script>

// CommitChart.js
import {  Doughnut } from 'vue-chartjs'

export default {
  extends:  Doughnut,
  props: ['data'],
  mounted () {
    // Overwriting base render method with actual data.
    console.log(this.data)
    this.renderChart({
      labels: ['good', 'middle', 'bad'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: ['#66CC66', '#FFFF22', '#FF6633'],
          data: [this.data[0], this.data[2], this.data[3]]
        }
      ]
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

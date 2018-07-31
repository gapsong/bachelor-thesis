
<script>

// LineChart.js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['name', 'data', 'options'],
  mounted() {
    this.renderLineChart();
  },
  computed: {
   chartData: function() {
     return this.data;
   },
   nameData: function(){
     return this.name
   }
  },
  methods:{
    renderLineChart: function(){
      var avgValue = Math.round(1500/7)
      this.renderChart({
      labels: ['Size', 'Repos', 'Issues', 'Comments', 'Commit', 'mergedPR', 'unmergedPR'],
      datasets: [
        { // another line graph
          label: 'Avg. User',
          data: [avgValue, avgValue, avgValue, avgValue, avgValue, avgValue, avgValue],
          backgroundColor: [
            'rgba(71, 183,132,.5)', // Green
          ],
          borderColor: [
            '#47b784',
          ],
          borderWidth: 3
        },
        { // another line graph
          label: this.nameData,
          data: this.chartData,
          backgroundColor: [
            'rgb(255,102,51,.5)', // Green
          ],
          borderColor: [
            '#47b784',
          ],
          borderWidth: 3
        }
      ]
      }, {
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            padding: 25,
          }
        }]
      }
      })
    }
  },
  watch: {
    data: function() {
      this.$data._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderLineChart();
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

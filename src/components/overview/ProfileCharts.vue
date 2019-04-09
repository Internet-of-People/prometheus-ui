<template>
  <div>
    <highcharts id="container1" :options="chartOptions1"></highcharts>
  </div>
</template>

<script>
export default {
  name: 'ProfileCharts',
  data() {
    return {
      chartOptions1: {
                chart: {
                    polar: true
                },

                title: {
                    text: 'Budget vs spending',
                    x: -80
                },

                pane: {
                    size: '80%'
                },

                xAxis: {
                    categories: ['Daily Expenses', 'Holiday Fund', 'Medical Expenses', 'Guilty Splurges',
                        'Carpentry Issues', 'Toys for Kids'],
                    tickmarkPlacement: 'on',
                    lineWidth: 0
                },

                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0
                },

                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
                },

                legend: {
                    align: 'right',
                    verticalAlign: 'middle'
                },

                series: [{
                    name: 'Allocated Budget',
                    data: [43000, 19000, 60000, 35000, 17000, 10000],
                    pointPlacement: 'on'
                }, {
                    name: 'Actual Spending',
                    data: [50000, 39000, 42000, 31000, 26000, 14000],
                    pointPlacement: 'on'
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom'
                            },
                            pane: {
                                size: '70%'
                            }
                        }
                    }]
                }

      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#container1 {
    min-width: 360px;
    max-width: 600px;
    height: 400px;
    margin: 0 auto;
}
</style>

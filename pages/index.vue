<template>
  <div class="container">
    <Chart></Chart>
    <List></List>
  </div>
</template>

<script>
import Chart from '~/components/Chart.vue'
import List from '~/components/List.vue'
//import Chart from 'chart.js'

export default {
  components: {
    Chart,
    List
  }
}
</script>

<style>
.container {

  margin: 0 auto;
  min-height: 100vh;
  min-width: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  display: flex;
  flex-direction: row;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

@media screen and (max-width: 600px) {
  .container{
    flex-direction: column;
    background-color: bisque;
  }
}

@media screen and (min-width: 1200px) {
  .container{
    flex-direction: row;
  }
}

</style>

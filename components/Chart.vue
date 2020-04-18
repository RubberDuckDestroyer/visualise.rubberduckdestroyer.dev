<template>
    <div class="chart">
        <canvas id="myChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js'
import {mapState} from 'vuex'

export default {
    name: 'chart',
    data() {
        return {
            ctx: null,
            myChart: null,
            renderData: this.data,
            options: {},
            hours: [8,16],
            backgroundColors: ['rgb(255, 99, 132)', 'rgb(132, 255, 99)'],
            labels: ['Sleep','Spare'],
        };
    },
    methods:{
        updateChart() {
            this.myChart.update();
            console.log('Chart updated');
        },
        resetChartData() {
            this.hours = [];
            this.backgroundColors = [];
            this.labels = [];
            console.log('Chart data reset')
        }
    },
    mounted() {
        console.log('Creating chart!')
        this.ctx = document.getElementById('myChart');
        this.myChart = new Chart(this.ctx, {
            // The type of chart we want to create
            type: 'pie',
            // The data for our dataset
            data: {
                datasets: [{
                    data: this.hours,
                    backgroundColor: this.backgroundColors,
                }],
                labels: this.labels
            },
            // Configuration options go here
            options: this.options
        });
        console.log(this.data)
    },
    computed:{
        ...mapState({activities: state => state.activities}),
        ...mapState({indexAdded: state => state.indexAdded}),
        ...mapState({indexRemoved: state => state.indexDeleted}),
        ...mapState({indexUpdated: state => state.indexUpdated})
    },
    created() {
        console.log('Created')
    },
    watch: {
        activities: function (val, oldVal) {
            console.log('Chart data modified')
            console.log(this.indexAdded)
            console.log(this.indexRemoved)
        },
        indexAdded: function(val, oldVal) {
            console.log(val, oldVal)
            console.log('Item added')
            // console.log(this.indexAdded)
            // console.log(this.activities)
            if (this.indexAdded !== 1){
                this.hours.push(this.activities[this.indexAdded].hours);
                this.backgroundColors.push(this.activities[this.indexAdded].color);
                this.labels.push(this.activities[this.indexAdded].name)
            } else {
                this.hours.splice(1, 1, this.activities[this.indexAdded].hours);
            }
            this.updateChart()
        },
        indexUpdated: function (val, oldVal) {
            // Item updated
            // this.hours = [];
            // this.backgroundColors = [];
            // this.labels = [];

            for(var i=0;i<this.activities.length; i++) {
                this.hours.splice(i, 1, this.activities[i].hours);
                this.backgroundColors.splice(i, 1, this.activities[i].color);
                console.log(this.activities[i].color)
                this.labels.splice(i, 1,this.activities[i].name);
                console.log(this.activities[i])
                //this.myChart.update();
            }

            console.log(this.hours);
            console.log(this.labels);
            console.log(this.backgroundColors)
            
            this.myChart.update();
            console.log('Item updated');
        },
        indexRemoved: function(val, oldVal) {
            // Item deleted
            console.log(val, oldVal);
            if (val !== -1) {
                this.hours.splice(val,1);
                this.hours.splice(1,1,this.activities[1].hours);
                console.log(this.activities[1].hours)
                this.backgroundColors.splice(val,1);
                this.labels.splice(val, 1);
                
            } else {
                console.log('No Item removed')
            }
            this.myChart.update()
        }
    }
}
</script>

<style scoped>
#myChart{
    width: 50vw;
    height: 50vh;
}
</style>
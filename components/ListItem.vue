<template>
  <div class="list-item">
        {{ id }}
        <div v-if="item.disabled">
            <input class="activity-name" type="text" disabled :value="item.name">
        </div>
        <div v-else>
            <input class="activity-name" type="text" :value="item.name" >
        </div>
        <input class="activity-hours" type="number" :value="item.hours"> hours
  </div>
</template>

<script>
export default {
    name: 'ListItem',
    props: {
        item:{
            type: Object,
            default: {
                name: 'Unnamed Activity',
                hours: 0,
                color: 'rgb(255,255,255)'
            }
        },
        id:{
            type: Number,
            required: true,
            default: 0
        }
    },
    data() {
        return {
            name: '',
            hours: 0
        }
    },
    watch: {
        item: function() {
            console.log('Item modified')

        }
    },
    created() {
        //alert('List item created!')
    },
    updated() {
        //alert('Component updated')
    },
    methods: {
        
    }
}
</script>

<style scoped>
.list-item{
    display: flex;
    flex-direction: row;
}

.list-item > input, .list-item > div >input{
    margin-left: 0.25vw;
}
</style>
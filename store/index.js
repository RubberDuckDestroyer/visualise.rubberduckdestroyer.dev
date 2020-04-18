export const state = () => ({
    /*data: {
        datasets: [{
            data: [8, 16],
            backgroundColor:['rgb(255, 99, 132)', 'rgb(132, 255, 99)']
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Sleep',
            'Spare'
        ]
    }, */
    activities: [{'name':'Sleep', 'hours':8, 'disabled':true, 'color':'rgb(255,99,132)'},
                 {'name':'Spare', 'hours':16, 'disabled': true, 'color': 'rgb(132, 255, 99)'}],
    chartIsUpdated: false,
    index: 1,
    indexUpdated: -1,
    indexDeleted: -1,
    indexAdded: 1,
})
  
export const mutations = {
    add (state, activity) {
        console.log(activity)
        console.log('Added item')
        
        state.activities.push(activity)
        state.index += 1
        this.state.activities[1].hours -= 1;

        this.state.indexAdded = state.index + 0;
    },
    delete (state, index) {
        console.log('Removed item')
        console.log(index)
        state.activities.splice(index, 1)
        console.log(this.state.activities)
        state.indexDeleted = index;
        state.index--;
        if(state.index === 1) {
            state.indexAdded = 1;
        }

        let total = 0;
        for(var i = 0; i< this.state.activities.length; i++) {
            total += (i === 1)? 0 : this.state.activities[i].hours;
        }
        state.activities[1].hours = 24 - total;
        console.log(this.state.activities[1].hours)
        console.log(this.state.indexDeleted)
    },
    update (state, updatedList){
        console.log(updatedList);
        console.log(state.activities);
        state.indexUpdated++;
        state.activities = updatedList;
        console.log(this.state.activities[0].hours)
        // console.log(this.state.indexUpdated)
    },
    resetIndexDeleted(state){
        state.indexDeleted = -1;
        console.log('Reset index');
    }
}

// export const strict = false;
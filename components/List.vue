<template>
    <div class="list">
        <form>
            <div v-for="(item, index) in listItems" :key=index class='activity-list' @change="enableUpdateButton">
                <div class="activity">
                    <ListItem :item="item" :id="index + 1"/>

                    <input type="button" class="delete-button" value="Delete" @click="deleteActivity(index)">
                </div>
            </div>
            <div class="button-bar">
                <button type="button" @click="downloadData" id="download-btn">Download Data</button>
                <button type="button" @click="addActivity">Add an activity</button>
                <button type="button" @click="updateForm" id="update-btn">Update form</button>
            </div>
        </form>
    </div>
</template>

<script>
import ListItem from '~/components/ListItem.vue'

export default {
    name: 'List',
    components: {ListItem},
    data() {
        return {
            index: 0, // Change name later
            listItems: [{'name':'Sleep', 'hours':8, 'disabled':true,'color':'rgb(255,99,132)'},
                        {'name':'Spare', 'hours':16, 'disabled': true,'color': 'rgb(132, 255, 99)'}]
        }
    },
    methods: {
        addActivity (event){

            if (this.listItems[1].hours !== 0) {

                var color = this.generateRandomRGB();

                this.listItems.push({'name':'Added activity','hours':1, 'disabled':false, 'color':color});
                this.listItems[1].hours -= 1;
                this.$store.commit('add', {'name':'Added activity', 'hours': 1, 'disabled': false, 'color':color});
            } else {
                alert('Max items reached!');
            }
            event.preventDefault();
        },
        deleteActivity(index) {
            console.log('Deleting index ' + index);
            if(index === 0 || index === 1) {
                alert('Cannot delete activity 1 and 2');
            } else {
                this.listItems.pop(index);
                let total = 0;
                for(var i = 0; i< this.listItems.length; i++) {
                    total += (i === 1)? 0 : this.listItems[i].hours;
                }
                this.listItems[1].hours = 24 - total;
                this.$store.commit('delete', index)
            }
        },
        enableUpdateButton() {
            var button = document.getElementById('update-btn');
            button.style.visibility =  "visible";
            console.log('Update button enabled');
        },
        updateForm(e) {

            var list = document.getElementsByClassName('activity-list');
            let updatedList = [];
            let total = 0;
            for(var i = 0;i<list.length;i++) {
                updatedList.push({
                    'name': list[i].getElementsByClassName('activity-name')[0].value, 
                    'hours': parseInt(list[i].getElementsByClassName('activity-hours')[0].value), 
                    'disabled': this.listItems[i].disabled,
                    'color': this.listItems[i].color
                });
                if( i !== 1) { 
                    total += updatedList[i].hours;
                    console.log(total);
                }

                if(updatedList[i].hours < 0) {
                    alert('Cannot have negative hours');
                    // Set to original hours
                    updatedList[i].hours = this.listItems[i].hours;

                }
            }

            if (total > 24){
                alert('Cannot have more than 24 hours in a day! please update time spent in activities!')
            } else {
                updatedList[1].hours = 24 - total;
                this.listItems[1].hours = updatedList[1].hours;
            }

            this.$store.commit('update', updatedList);
            
            var button = document.getElementById('update-btn');
            button.style.visibility =  "hidden";
            console.log('Update button enabled');
            
            e.preventDefault();
        },
        generateRandomRGB() {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            
            var color = 'rgb('+ r + ',' + g + ',' + b +')';
            return color
        },
        downloadData() {
            console.log('Downloading');
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.listItems));
            var dlAnchorElem = document.createElement('a');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "data.quack");
            dlAnchorElem.click();
        }

    },
    watch:{
        listItems: ()=>{
            // On updating list items, send data to vue event bus
        }
    },
}
</script>

<style>
.list{
    display: flex;
    width: 30vw;
}

.activity{
    display: flex;
    flex-direction: row;
}

.delete-button{
    visibility: hidden;
    margin-left: 0.25vw;
}

.activity:hover .delete-button {
    visibility: visible;
}

#update-btn{
    visibility: hidden;
}
</style>
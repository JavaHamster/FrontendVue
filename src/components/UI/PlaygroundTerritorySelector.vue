<template>
  <section class="playground-territory-selector-cotnainer" >
    <div v-if="territories_there">
        <select v-model="selectedTer">
            <option value="Select Terrain">Select Terrain</option>
            <option v-for="ter in terList" :key="ter.terrainName" :value="ter.terrainName">{{ ter.terrainName }}</option>
        </select>
        <button class="btn load-ter" @click="loadTer">Load Terrain</button>
    </div>
    <div v-else>
        <p class="msg">No Territories found</p>
    </div>
  </section>
  
</template>

<script>
export default {
    data(){
        return {    
            terList: {
                type: Array,
                default: []
            },
            selectedTer: 'Select Terrain',
            territories_there: false
        }
    },
    methods: {
        loadTer(){
            if(this.checkValue(this.selectedTer) || this.selectedTer == "Select Terrain")
                return;

            this.$emit('loadTer', this.terList.find((ter) => ter.terrainName == this.selectedTer))
        }
    },
    beforeMount(){
        try{
            this.terList = JSON.parse(localStorage.getItem('territories'))
            this.territories_there = this.terList.length != 0
        }catch(error){
            if(error instanceof SyntaxError){
                localStorage.removeItem('territories')
                this.territories_there = false
            }



        }
    }
}
</script>

<style>
.load-ter{
    margin-bottom: 1rem;
}
</style>
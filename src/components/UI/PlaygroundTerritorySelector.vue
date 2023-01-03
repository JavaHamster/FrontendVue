<template>
  <section class="playground-territory-selector-cotnainer">
    <select v-model="selectedTer">
        <option value="Select Terrain">Select Terrain</option>
        <option v-for="ter in terList" :key="ter.terrainName" :value="ter.terrainName">{{ ter.terrainName }}</option>
    </select>
    <button class="btn load-ter" @click="loadTer">Load Terrain</button>
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
            selectedTer: 'Select Terrain'
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
        this.terList = JSON.parse(localStorage.getItem('territories'))
    }
}
</script>

<style>
.load-ter{
    margin-bottom: 1rem;
}
</style>
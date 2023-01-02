<template>
    <section>
        <codemirror
            v-model="code"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            @change="updateValue($event)"
        />
        <button class="btn" @click="submitCode">Submit</button>
    </section>
</template>

<script>
  import { Codemirror } from 'vue-codemirror'
  import { java } from '@codemirror/lang-java'
  import { oneDark } from '@codemirror/theme-one-dark'

    import request_ from '@/assets/js/Request.js'


  export default {
    components: {
      Codemirror
    },
    data(){
        return {
            code: 
            `
            void main(){\n\t\n}
            
            `.trim(),
            extensions: [java(), oneDark],
            value: ""
        }
    },
    mounted() {
        this.value = this.code
    },
    methods: {
        updateValue(event){
            this.value = event
            
        },
        async submitCode(){

        let reqObj = {
          hamster: {
            programName: "test",
            program: this.value
          }
        }

        console.log(this.value)

        this.$parent.handleServerResponse(await request_(this.hostname + "hamster/defaultTerrain", reqObj, "post"))
      }
    }
  }
</script>

<style>
    
    .ͼ15 {
        height: 500px; 
        width: 750px;
        text-align: left;
    } 
    
</style>
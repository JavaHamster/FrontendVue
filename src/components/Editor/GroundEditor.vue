<template>
    <section>
        <codemirror
            v-model="code"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            @change="updateValue($event)"
            style="height:100%"
        />
        <br>
        <button class="btn" @click="submitCode">Submit</button>
    </section>
</template>

<script>
  import { Codemirror } from 'vue-codemirror'
  // import { java } from '@codemirror/lang-java'
  import {javascript} from '@codemirror/lang-javascript'
  import { oneDark } from '@codemirror/theme-one-dark'

  // Codemirror.

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
            extensions: [javascript(), oneDark],
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

        // this.$parent.handleServerResponse(await request_(this.hostname + "hamster/defaultTerrain", reqObj, "post"))
        this.$emit('submitted', reqObj)
      }
    }
  }
</script>

<style>
    
    .ͼ15, .cm-editor {
        height: clamp(250px, 35vh, 500px);
        width: clamp(450px, 45vw, 750px);
        text-align: left;
    } 

</style>
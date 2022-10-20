<template>
  <div class="wrapper">
      <QuillEditor id="richEditor" theme="snow" toolbar="" spellcheck="false"/>
      <!-- <RestButton @click="saveCode()" :link="this.hostname + 'hamster/defaultTerrain'" :type_="'codeSubmit_'" method="post" :data="this.data"/> -->
      <button class="submit_code" @click="submitCode()">Submit</button>
  </div>
</template>

<script>

import { QuillEditor } from '@vueup/vue-quill'
//eslint-disable-next-line
import RestButton from './RestButton.vue'
import request_ from '@/assets/js/Request.js'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


export default {
  components: {
    QuillEditor ,
    //eslint-disable-next-line
    RestButton
  },
  data() {
    return {
      data: ""
    }
  },
  methods: {
      getCode() {
          const editor = document.querySelector("#richEditor .ql-editor")
          const paragraphs = editor.querySelectorAll("p")
          let toReturn = []
          paragraphs.forEach(element => {
              if(element.innerText.trim().length != 0)
                toReturn.push(element.innerText.trim())
              else {
                console.error("Enter code!")
                return; 
              }
          })

          //TODO - add request to send code to '/api/hamster/defaultterrain'
            //void main(){
            // 	linksUm();
            // vor();
            // }
          return (toReturn.join("\n"))
      },
      async submitCode(){
        this.data = this.getCode()

        let reqObj = {
          hamster: {
            programName: "test",
            program: this.data
          }
        }

        console.log(this.data)

        this.$parent.handleServerResponse(await request_(this.hostname + "hamster/defaultTerrain", reqObj, "post"))
      }
  }
}
</script>

<style lang="scss">
    .wrapper {
        width: 60%;
        height: 100%;
    }
    #richEditor {
        max-height: 60vh;
        height: 60vh;
        border: 2px solid black;

        & > * > p{
          font-size: 24px;
          text-decoration: none;
        }
    }
    .ql-toolbar {
          display: none;
        }
    
    .submit_code {
      outline: 0;
      border: 0;
      background: green;
      width: 150px;
      height: 75px;
      color: white;
      border-radius: 10px;
      font-size: 20px;
      margin-block: 1rem;
    }

</style>
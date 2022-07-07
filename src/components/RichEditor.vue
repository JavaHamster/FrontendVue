<template>
  <div class="wrapper">
      <QuillEditor id="richEditor" theme="snow" toolbar=""/>
      <RestButton :link="this.hostname + 'hamster/defaultTerrain'" :type_="'codeSubmit_'" method="post" :data="this.data"/>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import RestButton from './RestButton.vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


export default {
  components: {
    QuillEditor ,
    RestButton
  },
  data() {
    return {
      data: ""
    }
  },
  methods: {
      getCode() {
        alert("kkdkdkdk")
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
//           void main(){
            // 	linksUm();
            // vor();
            // }
          return (toReturn.join("\n"))
      }
  }
}
</script>

<style>
    .wrapper {
        width: 60%;
        height: 100%;
    }
    #richEditor {
        max-height: 60vh;
        height: 60vh;
    }

</style>
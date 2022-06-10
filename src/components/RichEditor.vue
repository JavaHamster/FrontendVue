<template>
  <div class="wrapper">
      <QuillEditor id="richEditor" theme="snow" toolbar=""/>
      <button class="send" @click="sendCode()">Submit</button>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


export default {
  components: {
    QuillEditor
  },
  methods: {
      sendCode() {
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

          console.log(toReturn.join("\n"))
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
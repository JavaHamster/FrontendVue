<template>
  <MonacoEditor 
    class="editor" 
    v-model="code" 
    language="javascript" 
  />
</template>

<script>
import MonacoEditor from 'vue-monaco'
import { h } from 'vue'
MonacoEditor.render = () => h('div')
export default {
  components: {
    MonacoEditor
  },

  data() {
    return {
      code: 'const noop = () => {}'
    }
  }
}
</script>

<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>
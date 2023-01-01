<template>
  <div ref="loginWrapper"> 

    <LoginModule :link="this.hostname + 'login'"/>
    <div class="error-message-container"></div>
    
  </div>
</template>
 
<script>
import LoginModule from "../components/LoginModule.vue"
import ErrorMessage from "../components/ErrorMessage.vue"
import * as Vue from "vue"
var apps = []
export default {
    data(){
        return {
            
        }
    },
    components: {
        LoginModule,
        //eslint-disable-next-line
        ErrorMessage
    },
    methods: {
        login(){  
            alert(this.hostname)
        },
        showError(message){
            //TODO find another way to add Components
            // this.clearDOM()
            var instance = Vue.createApp(ErrorMessage, { message })
            apps.push(instance)
            const errorContainer = document.createElement("div")
            errorContainer.classList.add("error-message-container")
            instance.mount(errorContainer)
            this.$refs.loginWrapper.appendChild(errorContainer)
        },
        clearDOM(){
            //TODO delete all Apps
            const errorDivs = document.querySelector("error-message-container")
            const errorParent = document.getElementById("login-wrapper")
            console.log(errorDivs)
            errorParent.removeChild(errorDivs)
        }
    }
}
</script>

<style scoped>
    
    
</style>
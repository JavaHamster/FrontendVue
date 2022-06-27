<template>
  <div id="login-wrapper" ref="loginWrapper">
    
    <form action="">
        
        <h1>Login</h1>
        <input v-model="username" type="text" placeholder="Username/E-Mail">
        <input v-model="password" type="password" placeholder="Password">
        <LoginButton :link="this.hostname"></LoginButton>
    </form>
    
  </div>
</template>
 
<script>
import LoginButton from "../components/LoginButton.vue"
import ErrorMessage from "../components/ErrorMessage.vue"
import * as Vue from "vue"
var apps = []
export default {
    data(){
        return {
            username: "",
            password: ""
        }
    },
    components: {
        LoginButton,
        //eslint-disable-next-line
        ErrorMessage
    },
    methods: {
        login(){  
            alert(this.hostname)
        },
        getData(){
            return {
                username: this.username,
                password: this.password
            }
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

<style>
    #login-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    input{
        margin-block: 1rem;
        height: 40px;
        width: 250px;
        font-size: 16px;
    }
    .btn {
        width: 100px;
        height: 35px;
        background: #ee4266;
        color: white;
        border: none;
        outline: none;
        border-radius: 8px;
    }
</style>
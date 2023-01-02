<template>
  <div class="container">
    <h1>Rest - Example - Buttons</h1>
     <!-- Of cource you have to change the ip from localhost to the server-ip address 
     but you dont have to change smth in nginx - is tested! -->
    <RestButton name="Get All users" :link="this.hostname + 'user/getAllUsers'" method="get"/>
    <RestButton name="Create new user" :link="this.hostname + 'user/createUser'" method="post" :data="sendData" />
    <LoginButton :link="this.hostname + 'login'" :user="sendLogin" />
    <RestButton name="Run Default Hamster" :link="this.hostname + 'hamster/defaultTerrain'" method="post" :data="sendDefaultHamster" />
    <RestButton name="Logout" :link="this.hostname + 'user/logout'" method="get"/>
  </div>
</template>

<script>
import RestButton from "./UI/RestButton.vue";
import LoginButton from "./LoginModule.vue"

export default {
  name: "HeaderVue",
  data() {
    return {
      sendData: {
        "username": "vuetest", 
        "password": "vuetest",
      }, 
      sendLogin: {
        "username": "admin", 
        "password": "admin",
      },
      sendDefaultHamster: {
        "programName": "vuetest",
        "program": "void main() { linksUm();}",
      }
    };
  },
  props: {
  },
  components: {
    RestButton,
    LoginButton,
  },
};
</script>

<style scoped>
div {
  height: 100%;
}
</style>

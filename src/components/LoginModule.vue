<template>
  <div class="login-container">
    <h1>Login</h1>
    <input v-model="username" type="text" placeholder="Username/E-Mail">
    <input v-model="password" type="password" placeholder="Password">
    <button @click="clickevent" class="btn" v-text="name"></button>
    <!-- <p>{{ get }}</p> -->
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";

const https = require('https');

export default {
  name: "LoginButton",

  data() {
    return {
      get: "",
      username: "",
      password: ""
    };
  },
  props: {
    name: {
      type: String,
      default: "Login Button",
    },
    link: {
      type: String,
      default: "",
    }
  },
  methods: {
    // TestURL: https://gorest.co.in/public/v2/users
    async clickevent(event) {
      if (this.checkValue(this.username) || this.checkValue(this.password)){
        return
      }

      axios.defaults.withCredentials=true;
      var data = JSON.stringify({
        username: this.username,
        password: this.password,
      });
       
      console.log(data);
      console.log(this.link);
      var config = {
        method: "post",
        url: this.link,
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
        withCredentials: false,
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        data: data,
      };

      axios(config)
        .then(function (response) {
          return JSON.stringify(response.data);
        })
        .then(json => this.checkLogin(json))
        .catch(function (error) {
           console.log(JSON.stringify(error.data));
        });
    },
    checkLogin(json){
      this.get = json
      if(json == '""')
        this.$store.dispatch('auth/login')
    }
  },
};
</script>

<style lang="scss" scoped>
  .login-container {
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
</style>
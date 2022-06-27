<template>
  <div class="container">
    <button @click="clickevent()" class="btn" v-text="name"></button>
    <p>{{ get }}</p>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "LoginButton",

  data() {
    return {
      get: null,
      user: {
      type: Object,
      default: () => ({
        username: {
          type: String,
          default: "admin"
        },
        password: {
          type: String,
          default: "admin"
        }
      })
      }
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
    },
  },
  methods: {
    // TestURL: https://gorest.co.in/public/v2/users
    async clickevent() {
      this.user = await this.$parent.getData()
      console.table(this.user)
      
      if(this.user.username.length < 4 || this.user.password.length < 8){
        this.$parent.showError("Check input")
        return;
      }

      if(this.user.username != "admin123" || this.user.password != "admin123"){
        this.$parent.showError("Not allowed")
      }

      axios.defaults.withCredentials=true; 
      var data = JSON.stringify({
        username: this.user.username,
        password: this.user.password,
      });
      var config = {
        method: "post",
        url: this.link,
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Content-Type": "application/json",
          "Accept": "*/*", 
        },
        withCredentials: true, 
        data: data,
      };

      axios(config)
        .then(function (response) {
          return JSON.stringify(response.data);
        })
        .then(json => this.get = json)
        .catch(function (error) {
           console.log(JSON.stringify(error.data));
        });
    },
  },
};
</script>

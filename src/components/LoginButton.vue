<template>
  <div class="container">
    <button @click="clickevent" class="btn" v-text="name"></button>
    <p>{{ get }}</p>
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
      get: null,
      tempUser: {
      type: Object,
      default: () => ({
        username: {
          type: String,
        },
        password: {
          type: String,
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
    user: {
      type: Object,
    }
  },
  methods: {
    // TestURL: https://gorest.co.in/public/v2/users
    async clickevent(event) {
      
      if (this.user.username == "" && this.user.password == ""){
        let user_ = this.$parent.getData()
        this.user.username = user_.username
        this.user.password = user_.password
      }

      axios.defaults.withCredentials=true; 
      var data = JSON.stringify({
        username: this.user.username,
        password: this.user.password,
      });
       
      console.log(this.data)

      var config = {
        method: "post",
        url: this.link,
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Content-Type": "application/json",
          "Accept": "*/*", 
        },
        withCredentials: true, 
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
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

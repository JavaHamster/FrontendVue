
<template>
  <div class="container">
    <button @click="clickevent()" class="btn" v-text="name"></button>
  </div>
</template>

<script>
/*eslint-disable*/
import axios from "axios";
export default {
  name: "RestButton",

  data() {
    return {
      get: "",
      html_methods: {
        GET: "get",
        POST: "post",
        PATCH: "patch",
        PUT: "put",
        DELETE: "delete",
      },
    };
  },
  props: {
    name: {
      type: String,
      default: "Rest Get Button",
    },
    link: {
      type: String,
      default: "",
    },
    method: {
      type: String,
      default: "",
    },
    data: {
      type: Object,
      default: {},
    },
    type_:{
      type: String,
      default: "rest"
    }
  },
  methods: {
    // TestURL: https://gorest.co.in/public/v2/users
    async clickevent() {

      axios.defaults.withCredentials = true;
      var config = {
        method: this.method,
        url: this.link,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true, 
        data: this.method == this.html_methods.GET ? null : this.data,
      };

      axios(config)
        .then(function (response) {
          return JSON.stringify(response.data);
        })
        .then(json => this.emitResponse(json))
        .catch(function (error) {
           console.log(JSON.stringify(error.data));
        });
    },
    emitResponse(response){
      this.$emit('onResponse', response)
    }
  },
};
</script>

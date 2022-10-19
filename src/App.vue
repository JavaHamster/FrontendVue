<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/playground">Play Ground</router-link> |
    <router-link to="/login">Login</router-link>
  </nav>
  <!-- <RestButton :name="'Log Out'" :link="this.hostname + 'user/logout'" :method="get" ></RestButton> -->
  <button @click="logout()">Log Out</button>
  <router-view/>
</template>

<script>
/*eslint-disable */
import RestButton from "@/components/RestButton.vue"
export default {
  components: {
    RestButton
  },
  data(){
    return {

    }
  },
  methods: {
    async logout(){
      fetch(this.hostname + "user/logout")
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
  width: 100vw;
  height: 100vh;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/playground">Play Ground</router-link> |
    <router-link to="/login">Login</router-link> | 
    <router-link to="/gamebuilder">Build Game</router-link> 
  </nav>
  <!-- <RestButton :name="'Log Out'" :link="this.hostname + 'user/logout'" :method="get" ></RestButton> -->
  <button @click="logout()" class="btn">Log Out</button>
  <router-view/>
</template>

<script>
/*eslint-disable */
import RestButton from "@/components/UI/RestButton.vue"
export default {
  components: {
    RestButton
  },
  data(){
    return {
      gameBuilder_Switches: []
    }
  },
  methods: {
    async logout(){
      try {
        fetch(this.hostname + "user/logout")
      } catch (error) {
        alert("ERROR")
      }
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
  font-size: 1rem;
  overflow-x: hidden;
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

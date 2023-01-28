<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link v-if="isLoggedIn" to="/playground">Playground</router-link> |
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link> | 
    <router-link v-if="isLoggedIn" to="/gamebuilder">Build Game</router-link> 
  </nav>
  <RestButton v-if="isLoggedIn" name="Log Out" :link="this.hostname + 'logout'" method="get" @onResponse="logOutResponse($event)"></RestButton>
  <p v-if="$store.state.isInactive">
    Last interaction: {{ $store.getters.lastInteraction }}
  </p>
  <!-- <button @click="logout()" v-if="isLoggedIn" class="btn">Log Out</button> -->
  <router-view/>
</template>

<script>
/*eslint-disable */
import RestButton from "@/components/UI/RestButton.vue"

export default {
  components: {
    RestButton
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters['auth/isLoggedIn']
    }
  },
  data(){
    return {
      gameBuilder_Switches: [],
    }
  },
  methods: {
    updateInteraction() {
      this.$store.commit('updateInteraction')
    },
    logOutResponse(e){
      if(e == '""')
        this.$store.dispatch('auth/logout')
    }
  },
  mounted(){
    window.addEventListener('mousemove', this.updateInteraction);
    window.addEventListener('keydown', this.updateInteraction);
    this.$store.dispatch('checkInactivity')
  },
  beforeUnmount(){
    window.removeEventListener('mousemove', this.updateInteraction);
    window.removeEventListener('keydown', this.updateInteraction);
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;
}
html {
  width: 100vw;
  height: 100vh;
  font-size: 1rem;
  overflow-x: hidden;
}

body {
  height: 100%;
  margin: 0;
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
.playground {
    display: grid;
    gap: 5px;
    aspect-ratio: 1/1;
    user-select: none;
    height: 100%;
}
.play-field {
    position: relative;
    border: 1px solid black;
    min-width: 25px;
    aspect-ratio: 1/1;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(.75em, 1.25vw, 2em);

    &.corn{
        background: brown;
    }
    &.wall {
        background: black;
    }
    &.player {
        background-color: blue;
        background-image: url('@/assets/svg/arrow.svg');
        background-position: center;
        background-size: contain;
        object-fit: contain;

        &[direction="up"]{
            transform: rotate(0deg);
        }
        &[direction="down"]{
            transform: rotate(180deg);
        }
        &[direction="left"]{
            transform: rotate(-90deg);
        }
        &[direction="right"]{
            transform: rotate(90deg);
        }
    }
}
</style>

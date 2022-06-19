<template>
    <div>
        <h1>{{hello}}</h1>
        <div class="flex-container">
            <div>
                <div class="play-ground"></div>
                <button class="start-btn" @click="start">Start</button>
            </div>
            <code-editor/>
        </div>
    </div>
</template>

<script>
import CodeEditor from '../components/RichEditor.vue'
import Game from '../assets/js/Game.js'
export default {
components: {
    CodeEditor
},
props : {
    
},
data() {
    return {
        hello : "Welcome to the Play Ground",
        terrain : {
        dimension : {
            width: 10,
            height: 10,
            size : null
        },
        playGround : "10\n10\n###   ####\n  >       \n  *       \n  *       \n          \n          \n          \n          \n          \n          \n0\n1\n1\n0\n",
        content: "<h1>Some initial content</h1>",
        game: "" 
    }
    }
},
beforeMount() {
    this.terrain.dimension.size = this.terrain.dimension.width * this.terrain.dimension.height
},
mounted() {
    let playGround_HTML = document.querySelector(".play-ground")
    this.game = new Game(this.terrain, playGround_HTML)
    this.game.createPlayGround()
    this.game.loadEntities()
    console.info("loaded game object")
},
methods : {
    start(){
        if(this.game == "" || typeof this.game == 'undefined'){
            console.error("Game object null!")
            return
        }
            
        this.game.handleResponse(" ")
    }
        
}
}
</script>

<style lang="scss">
$player-direction-border: 6px;
$player-direction-color: black;
.play-ground {
    display: grid;
    grid-template-columns: repeat(10, 50px);
    grid-template-rows: repeat(10, 50px);
    gap: 5px;
}
.play-field {
    border: 1px solid black;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    color: white;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
    &.corn{
        background: brown;
    }
    &.wall {
        background: black;
    }
    &.player {
        background: blue;
        &[direction="up"]{
            border-top: $player-direction-border solid $player-direction-color
        }
        &[direction="down"]{
            border-bottom: $player-direction-border solid $player-direction-color
        }
        &[direction="left"]{
            border-left: $player-direction-border solid $player-direction-color
        }
        &[direction="right"]{
            border-right: $player-direction-border solid $player-direction-color;
        }
    }
}
.flex-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly
}
.start-btn {
    margin-top: 1rem;
}
</style>
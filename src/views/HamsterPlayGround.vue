<template>
    <div class="playground-wrapper">
        
        <h1>{{hello}}</h1>
        <div class="flex-container">
            <div>
                <PlaygroundTerritorySelectorVue @loadTer="loadTer($event)"/>
                <div class="playground" data-playground-></div>
                <button class="start-btn btn" @click="start">Start</button>
                <button class="btn" @click="print">Print</button>
                <button class="btn" @click="cleanField">Cleanup</button>
                <button class="btn" @click="reset">Reset Field</button>
            </div>
            <GroundEditorVue/>
        </div>
    </div>
</template>

<script>
// import CodeEditor from '../components/RichEditor.vue'
// import CodeEditor from '../components/Editor/MonacoEditor.vue'
import GroundEditorVue from '@/components/Editor/GroundEditor.vue'
import PlaygroundTerritorySelectorVue from '@/components/UI/PlaygroundTerritorySelector.vue'
import Game from '../assets/js/Game.js'

export default {
components: {
    GroundEditorVue,
    PlaygroundTerritorySelectorVue
},
props : {
    
},
data() {
    return {
        hello : "Welcome to the Playground",
        terrain : {
            dimension : { 
                width: 10,
                height: 10,
                size : null
            },
            // playGround : "10\n10\n###   ####\n  >       \n  *       \n  *       \n          \n          \n          \n          \n          \n          \n0\n1\n1\n0\n",
            playGround: "10\n10\n##        \n>         \n  *       \n  *       \n          \n          \n          \n          \n          \n          \n0\n1\n1\n0",
            content: "<h1>Some initial content</h1>",
            game: "",
            reponse: ""
        }
    }
},
beforeMount() {
    this.terrain.dimension.size = this.terrain.dimension.width * this.terrain.dimension.height
},
mounted() {
    this.game = this.newGame()
    
    console.info("loaded game object")
},
methods : {
    start(){
        this.game.handleResponse({0: '12', 1: '1', 2: '2', 3: '2', 4: '1', 5: '2', 6: '2', finished: 'working'})
    },
    print(){
        this.game.printCorns()
        this.game.printPlayer()
    },
    cleanField(){
        this.game.cleanupField()
    },
    setResponse(response){
        this.response = response
    },
    handleServerResponse(response) {
        //eslint-disable-next-line
        if(!response.hasOwnProperty("0") && !response[0] == 12){
            console.error("Wrong Response!")
            return
        }
            
        if(response == undefined)
            return
        console.log(response)
        this.game.handleResponse(response)
    },
    newGame(){
        let playGround_HTML = document.querySelector(".playground[data-playground-]")
        playGround_HTML.innerHTML = ""
        return new Game({
            terrain: this.terrain,
            playGroundContainer: playGround_HTML,
            stringLoad: true
        })
    },
    reset(){
        this.game = this.newGame()
    },
    loadTer(e){
        let playGround_HTML = document.querySelector(".playground[data-playground-]")
        playGround_HTML.innerHTML = ""
        let obj = {
            playGroundContainer: playGround_HTML,
            stringLoad: false,
            playGroundObj: e
        }
        console.log(obj)
        this.game = new Game(obj)
    },
}
}
</script>

<style lang="scss">
$player-direction-border: 6px;
$player-direction-color: black;

.playground-wrapper {
    position: relative;
    height: 100%;

}

.playground[data-playground-] {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    gap: 5px;
    aspect-ratio: 1/1;
    user-select: none;
    height: 100%;
}
.play-field {
    position: relative;
    border: 1px solid black;
    min-width: 25px;
    // width: 50px;
    aspect-ratio: 1/1;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(1rem, 1.25vw, 2rem);
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
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly
}
.start-btn {
    margin-top: 1rem;
}

.btn {
    margin-inline: .5rem;
}

.editor {
    width: 600px;
    height: 800px;
}

</style>
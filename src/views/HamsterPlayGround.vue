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
            <GroundEditorVue @submitted="submitCode($event)"/>
        </div>
    </div>
</template>

<script>
// import CodeEditor from '../components/RichEditor.vue'
// import CodeEditor from '../components/Editor/MonacoEditor.vue'
import GroundEditorVue from '@/components/Editor/GroundEditor.vue'
import PlaygroundTerritorySelectorVue from '@/components/UI/PlaygroundTerritorySelector.vue'
import Game from '../assets/js/Game.js' 
import {request_} from '../assets/js/Request.js'
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
            reponse: "",
            direction: 1
        },
        field_attribute: 'data-playground-field-',
        loaded_terrain_obj: {
            type: Object
        }
    }
},
beforeMount() {
    this.terrain.dimension.size = this.terrain.dimension.width * this.terrain.dimension.height
},
mounted() {
    this.game = this.newGame()
    this.game.on('cornChange', (event) => this.cornChanged(event))
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
        // playGround_HTML.innerHTML = ""
        // return new Game(this.terrain, playGround_HTML)

        let game = new Game(playGround_HTML, this.field_attribute)
        this.loaded_terrain_obj = game.createEntityString(this.terrain)
        return game
    },
    reset(){
        this.game = this.newGame()
    },
    loadTer(e){
        console.log(e)
        this.game.createEntityObj(e)
        this.loaded_terrain_obj = e
    },
    async submitCode(e){        
        for(let prop in this.loaded_terrain_obj){
            if(prop != 'program'){
                e.hamster[prop] = this.loaded_terrain_obj[prop]
            }
        }

        let result = await request_(this.hostname + "/hamster/newTerrain", e, 'POST')
        console.log(result)
        this.game.handleResponse(result)
    },
    cornChanged(event){
        alert("CornChanged")
    }

}
}
</script>

<style lang="scss">

.playground-wrapper {
    position: relative;
    height: 100%;

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
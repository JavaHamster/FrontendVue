//TODO: make diagonal placing
<template>
    <section class="game-builder">
        <div class="inputs">
            <div class="input-wrapper">
                <label for="height" class="height-label">Höhe: </label>
                <RangeSliderVue class="slider hight" :min_size="min_size" :max_size="max_size" target="height" @onValueChange="handleRangeChange"/>
            </div>
            <div class="input-wrapper">
                <label for="width" class="width-label">Breite: </label>
                <RangeSliderVue class="slider width" :min_size="min_size" :max_size="max_size" target="width" @onValueChange="handleRangeChange"/>

            </div>
            <div class="input-wrapper">
                <label for="width" class="width-label">Körner Anzahl: </label>
                <RangeSliderVue class="slider corn_anz" min_size="1" max_size="10" target="corn_anz" @onValueChange="handleRangeChange"/>
            </div>
            <button @click="createPlayground" class="btn" id="applyField">Draw</button>
        </div>
        <div class="mode-container">
            <GameBuilderBuildOptionVue :switches="switches"/>
        </div>

    <div ref="playground" class="playground" ></div>
    <div class="btn-wrapper">
        <button id="submit" class="btn" @click="submit">Submit</button>
        
        <button id="clear-playground" class="btn" @click="resetPlayGround">Clear</button>
    </div>
    </section>
</template>

<script>        
/* eslint-disable */

import {getPlayerDirection,PLAYER_DIRECTION} from '@/assets/js/utils.js'
import RangeSliderVue from '@/components/UI/RangeSlider.vue'
import GameBuilderBuildOptionVue from '@/components/GameBuilderBuildOption.vue'
export default {
    components: {
        RangeSliderVue,
        GameBuilderBuildOptionVue
    },
    created(){
        
        var arr = []
        arr.push({
            id: "corn-mode",
            name: "Corn",
            icon_url: "../assets/svg/corn-hybrid.svg"
        })

        arr.push({
            id: "player-mode",
            name: "Player",
            icon_url: "../assets/svg/hamster.svg"
        })

        arr.push({
            id: "wall-mode",
            name: "Wall",
            icon_url: "../assets/svg/wall.svg"
        })

        arr.push({
            id: "remove-mode",
            name: "Remove",
            icon_url: "../assets/svg/remove.svg"            
        })

        this.switches = arr
    },
    data() {
        return{
            size: {
                width: 5,
                height: 5
            },
            switches:[],
            cornAnz: 1,
            clicking: false,
            max_size: 15,
            min_size: 1,
            entity_symbols: Object.freeze({
                PLAYER: ">",
                WALL: "#",
                CORN: "*"
            }),
            max_player: 1,
            player_count: 0,
            direction: "",
            player_direction: PLAYER_DIRECTION.RIGHT,
            hamster: {
                programName: "test", 
                program: "void main() {vor();}",
                terrainName: "testTerrain", 
                laenge: 0, 
                breite: 0, 
                x: 0, 
                y: 1, 
                blickrichtung: 1,
                cornAnzahl: [],
                corn: [], 
                wall: []
            },
            changed: false
        }
    },
    methods: {
        createPlayground(){

            if (this.size.width == 1 && this.size.height == 1){
                alert("Dimension of Playground is to small!")
                return;
            }

            let playground = this.$refs.playground
            
            if(this.changed == true){
                if(this.resetPlayGround() == false)
                    return;
            } else{
                playground.innerHTML = ''
            }

            playground.addEventListener('mousedown', () => {
                this.clicking = true
            })

            playground.addEventListener("mouseup", () => {
                this.clicking = false
            })

            playground.addEventListener("mouseleave", () => {
                this.clicking = false
            })

            playground.style.gridTemplateColumns = `repeat(${this.size.width}, 1fr)`
            playground.style.gridTemplateRow = `repeat(${this.size.height}, 1fr)`

            for(let i = 0; i < this.size.width*this.size.height; i++){
                let div = document.createElement("div")
                div.classList.add("play-field")
                div.setAttribute("index", i)
                div.addEventListener("mousedown", (event) => {
                    this.changeField(event.currentTarget, true)
                })
                div.addEventListener("mouseover", (event) => {
                    this.changeField(event.currentTarget)
                })

                playground.appendChild(div)
            }
        },
        resetPlayGround(){
            if(this.checkValue(this.$refs.playground.innerHTML) == false){
                if(confirm("Playground would be reset!") == false)
                    return false;
            }
            

           this.$refs.playground.innerHTML = ''
        },
        changeField(element, override=false){ //method for changing single playfield. example: empty field to player
            let last_classList = element.classList
            
            if(!this.clicking && !override) //check if method is getting overriden (for testing) or action handler is fireing
                return;

            this.changed = true

            let mode = this.getMode()
            if(mode == "player" && this.player_count >= this.max_player){
                if(element.classList.contains("player")){
                    this.changeDirection()
                    element.setAttribute("direction", getPlayerDirection(this.player_direction))
                }
                return;
            }
            
            if(element.classList.contains("player")) 
                this.player_count--

            if(mode == "remove"){
                if(last_classList.contains("player")){
                    this.player_count = 0
                }
                element.classList = "play-field"
                element.innerText = ""
                return
            }

            element.classList = "play-field"

            if(mode == "player"){
                this.player_count++
                element.setAttribute('direction', getPlayerDirection(this.player_direction))
            }            
            element.classList.add(mode)
            element.innerText = ""

            if(mode == "corn"){
                element.innerText = this.cornAnz
            }
        },
        getMode(){ //getting the current selected mode
            let checked = document.querySelector("input[type=radio]:checked")
            if(checked == undefined)
                return
            return checked.id.split("-")[0]
        },
        submit(){ //reading html playground and creating stringifiable array
            let playground = this.$refs.playground
            let player = playground.querySelectorAll(".play-field.player")

            if (playground.innerHTML == ""){
                alert("No Playground generated!")
                return;
            }    

            if(player.length <= 0){
                alert("Select a player")
                return;
            }

            if(player.length > 1){
                alert("Only 1 Player allowed")
                return;
            }

            let play_field = playground.querySelectorAll(".play-field")
            let playground_created = []
            let field_type = ""
            let row = []
            
            for(let y = 0; y < this.size.height; y++){
                row = []
                for(let x = 0; x < this.size.width; x++){
                    let field = play_field[x + this.size.width*y]
                    let classlist = field.classList

                    if(classlist.contains("player")){
                        field_type = this.entity_symbols.PLAYER
                        this.hamster.x = x
                        this.hamster.y = y
                    }else if(classlist.contains("corn")){
                        field_type = this.entity_symbols.CORN
                        this.hamster.cornAnzahl.push(Number(field.innerText))
                        this.hamster.corn.push([x, y])
                    }else if(classlist.contains("wall")){
                        field_type = this.entity_symbols.WALL
                        this.hamster.wall.push([x, y])
                    }
                    else
                        field_type = ' '
                    
                    row.push(field_type)
                }
                playground_created.push(row)
            }

            this.stringifyField(playground_created)
            this.createTerJson()
        },
        stringifyField(field) { //creat string from current playground --> string needed for game start 
            let output = ""
            output += `${this.size.height}\n${this.size.width}\n`
            field.forEach(field_row => {
                field_row.forEach(field => {
                    output += field
                })
                output += "\n"
            })
        },
        changeDirection(){ //Method for changing viewing direction from the hamster
            this.player_direction--
            if(this.player_direction < 0)
                this.player_direction = Object.keys(PLAYER_DIRECTION).length-1
        },
        createTerJson(){ //Method for creating Terrain-Json-Object for Backendserver
            let terName = prompt("Enter Name of Territory:")
            if (terName == "" || terName == undefined  || terName == null ){
                console.warn("submit cancelled!")
                return
            }

            let lhamster = this.hamster

            lhamster.blickrichtung = this.player_direction
            lhamster.breite = this.size.height
            lhamster.laenge = this.size.width
            lhamster.terrainName = terName

            this.hamster = lhamster
            
            let currSavedTerrs = localStorage.getItem('territories')

            if (currSavedTerrs == null || currSavedTerrs == undefined)
                currSavedTerrs = []
            else
                currSavedTerrs = JSON.parse(currSavedTerrs)
            
            currSavedTerrs.push(this.hamster)

            localStorage.setItem('territories', JSON.stringify(currSavedTerrs)) //currently getting save locally
        },
        handleRangeChange(target, value) { //method for handeling Rangeslider-Child value change
            switch(target){
                case "height": //'height' would be the target of the Component
                    this.size.height = value
                    break;
                case "width":
                    this.size.width = value
                    break;
                case "corn_anz":
                    this.cornAnz = value
            }
        }
    }
}
</script>

<style lang="scss">
$player-direction-border: 6px;
$player-direction-color: black;

.game-builder .playground {
    width: min-content;
    margin: 2em;
    margin-inline: auto;
    height: min-content;
    aspect-ratio: 1/1;

    & .play-field {
        width: 50px;
    }
}


.slider {
    transform: scale(.85)
}

.input-wrapper {
    margin-block: 1rem;
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button{
    appearance: none;
    margin: 0
}

.inputs {
    display: grid;
    place-items: center;
    
    & > div{
        display: grid;
        align-items: center;
        grid-template-columns: repeat(2, .75fr);
        grid-auto-rows: 50px;
    }
}

.mode-container {
    display: flex;
    justify-content: center;
    margin-top: 2em;
}
.btn-wrapper {
    display: flex;
    gap: 1em;
    justify-content: center
}
</style>
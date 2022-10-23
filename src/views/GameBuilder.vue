//TODO: make diagonal placing
<template>
    <div class="inputs">
        <div class="input-wrapper">
            <label for="height" class="height-label">Höhe: </label>
            <input @change="() => {if(size.height > max_size) size.height = max_size}" v-model="size.height" type="number" id="height">
        </div>
        <div class="input-wrapper">
            <label for="width" class="width-label">Breite: </label>
            <input @change="() => {if(size.width > max_size) size.width = max_size}" v-model="size.width" type="number" id="width">
        </div>
        <div class="input-wrapper">
            <label for="width" class="width-label">Körner Anzahl: </label>
            <input @change="checkInput" v-model="cornAnz" type="number" id="cornAnz">
        </div>

        <div>
            Blickrichtung: 
            <select name="" id="" v-model="direction">
            <option value="3">Rechts</option>
            <option value="1">Links</option>
            <option value="0">Oben</option>
            <option value="2">Unten</option>
        </select>
        </div>
        <button @click="createPlayground" class="btn" id="applyField">Draw</button>
    </div>
    <div class="mode-container">
        <label for="corn-mode">
            <input type="radio" name="mode" id="corn-mode">
            Corn</label>
        <label for="player-mode">
            <input type="radio" name="mode" id="player-mode">
            Player</label>
        <label for="wall-mode">
            <input type="radio" name="mode" id="wall-mode">
            Wall</label>
        <label for="remove-mode">
            <input type="radio" name="mode" id="remove-mode">
            Remove</label>
    </div>

  <div ref="play_ground" class="play-ground" ></div>
  <button id="submit" @click="submit">Submit</button>
</template>

<script>        
/* eslint-disable */

export default {
    data() {
        return{
            size: {
                width: 5,
                height: 5
            },
            cornAnz: 1,
            clicking: false,
            mounted: false,
            entity_symbols: Object.freeze({
                                PLAYER: ">",
                                WALL: "#",
                                CORN: "*"
                            }),
            max_size: 15,
            player_count: 0,
            direction: ""
            
        }
    },
    mounted () {
        this.mounted = true
    },
    methods: {
        createPlayground(){
            let play_ground = this.$refs.play_ground
            play_ground.innerHTML = ''

            play_ground.addEventListener('mousedown', () => {
                this.clicking = true
            })

            play_ground.addEventListener("mouseup", () => {
                this.clicking = false
            })

            play_ground.addEventListener("mouseleave", () => {
                this.clicking = false
            })

            play_ground.style.gridTemplateColumns = `repeat(${this.size.width}, 50px)`
            play_ground.style.gridTemplateRow = `repeat(${this.size.height}, 50px)`

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

                play_ground.appendChild(div)
            }



            console.log(play_ground)
        },
        changeField(element, override=false){
            let last_classList = element.classList
            
            if(!this.clicking && !override)
                return;

            let mode = this.getMode()
            if(mode == "player" && this.player_count >= 1)
                return;

            console.log(last_classList)
            if(mode == "remove"){
                if(last_classList.contains("player")){
                    this.player_count = 0
                }
                element.classList = "play-field"
                element.innerText = ""
                return
            }

            element.classList = "play-field"

            if(mode == "player")
                this.player_count++
            
            element.classList.add(mode)
            element.innerText = ""

            if(mode == "corn"){
                element.innerText = this.cornAnz
            }
        },
        getMode(){
            let checked = document.querySelector("input[type=radio]:checked")
            if(checked == undefined)
                return
            return checked.id.split("-")[0]
        },
        submit(){
            let play_ground = this.$refs.play_ground
            let player = play_ground.querySelectorAll(".play-field.player")
            
            if(player.length <= 0){
                alert("Select a player")
                return;
            }
            if(player.length > 1){
                alert("Only 1 Player allowed")
                return;
            }

            let play_field = play_ground.querySelectorAll(".play-field")
            let play_ground_created = []
            let field_type = ""
            let row = []
            
            for(let y = 0; y < this.size.height; y++){
                row = []
                for(let x = 0; x < this.size.width; x++){
                    let classlist = play_field[x + this.size.width*y].classList

                    if(classlist.contains("player"))
                        field_type = this.entity_symbols.PLAYER
                    else if(classlist.contains("corn"))
                        field_type = this.entity_symbols.CORN
                    else if(classlist.contains("wall"))
                        field_type = this.entity_symbols.WALL
                    else
                        field_type = ' '
                    
                    row.push(field_type)
                }
                play_ground_created.push(row)
            }
            console.table(play_ground_created)
            this.stringifyField(play_ground_created)
        },
        stringifyField(field) {
            let output = ""
            output += `${this.size.height}\n${this.size.width}\n`
            field.forEach(field_row => {
                field_row.forEach(field => {
                    output += field
                })
                output += "\n"
            })

            console.log(output)
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
    user-select: none;
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

.input-wrapper {
    margin-block: 1rem;
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button{
    appearance: none;
    margin: 0
}


</style>
//TODO: make diagonal placing
<template>
    <div class="inputs">
        <div class="input-wrapper">
            <label for="height" class="height-label">Höhe: </label>
            <input v-model="size.height" type="number" id="height">
        </div>
        <div class="input-wrapper">
            <label for="width" class="width-label">Breite: </label>
            <input v-model="size.width" type="number" id="width">
        </div>
        <div class="input-wrapper">
            <label for="width" class="width-label">Körner Anzahl: </label>
            <input v-model="cornAnz" type="number" id="cornAnz">
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
            mounted: false
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
            if(!this.clicking && !override)
                return;

            element.classList = "play-field"

            let mode = this.getMode()
            if(mode == "remove"){
                element.innerText = ""
                return
            }
            
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
            let play_ground = tis$refs.play_ground
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
            play_field.forEach((field) => {
                
            })

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

.input-wrapper {
    margin-block: 1rem;
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button{
    appearance: none;
    margin: 0
}


</style>
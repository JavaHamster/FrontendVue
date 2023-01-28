/*eslint-disable */

// TODO: FIX ROW JUMP: if player x > ground width player moves into next row
// TODO: FIX FIRST FIELD JUMP

import { CommandCreator } from "./Command"
import {getPlayerDirection, PLAYER_DIRECTION} from '@/assets/js/utils.js'
export default class Game{
    renderDelay = 500
    corns = []
    player = {
        position: new Vector2D(0, 0),
        direction: PLAYER_DIRECTION.RIGHT,
        currentFieldIndex: 0,
        corn: 0
    }

    constructor(terrain, playGround, playField, player){
        this.initiated = false
        this.terrain = terrain
        this.playGround = playGround
        this.playField = playField || playGround.querySelectorAll(".play-field")
        // this.player.x = player.x || 0
        // this.player.y = player.y || 0

        this.moveForward = this.moveForward.bind(this)

        this.commandCreator = new CommandCreator()

        console.log("Direction : " + getPlayerDirection(this.player.direction))
        this.init()
    }

    init() {
        if(this.initiated == true)
            return;
        this.initCommands()
        this.createPlayGround()
        this.loadEntities()
        this.player.currentFieldIndex = this.getFieldIndex(this.player.position)
        this.initiated = true
    }

    initCommands(){
        let game_object = Object.create(this)

        this.commandCreator.createCommand("1", function(){
            this.game.moveForward()
        }, "Move forward by one field", game_object)

        this.commandCreator.createCommand("2", function(){
            let currentDirection = this.game.player.direction
            currentDirection--

            if(currentDirection < 0)
                currentDirection = PLAYER_DIRECTION.LEFT

            this.game.player.direction = currentDirection
            this.game.updatePlayer()
        }, "Player turns left", game_object)
        
        this.commandCreator.createCommand("3", function(){
            this.game.storeCorn(this.player.position)
        }, "Put down a corn if able", game_object)

        this.commandCreator.createCommand("4", function() {
            this.game.collectCorn(new Vector2D(this.game.player.position.x, this.game.player.position.y)) 
        }, "Pick up 1 Corn if available", game_object)

        this.commandCreator.createCommand("5", function(){
            console.warn("Action of Command with ID: " + this.id + " is undefined")
        }, "Unused for now", game_object)
        this.commandCreator.createCommand("working", function(){
            console.log("Finished!")
        }, "Success Message")
    }

    

    loadEntities() {
        const terLines = this.terrain.playGround.split("\n")
        var playGround_arr = []
        console.log(this.terrain.playGround)

        for(let i = 2; i < this.terrain.dimension.height + 2; i++){
            let temp = terLines[i].split('')
            playGround_arr.push(temp)
        }

        console.table(playGround_arr)
        let color = "white"
        for(let i = 0; i < this.terrain.dimension.height; i++){ //x: j | y: i
            const currentRow = Array.from(this.playField).slice(i*this.terrain.dimension.width, (this.terrain.dimension.width*(i+1)));
            for(let j = 0; j < currentRow.length; j++){
                if(typeof playGround_arr[i][j] == 'undefined' || playGround_arr[i][j] == ' ')
                    color = ""
                else if(playGround_arr[i][j] == "#")
                    color = "wall"
                else if(playGround_arr[i][j] == '>'){
                    currentRow[j].setAttribute("direction", getPlayerDirection(this.player.direction))
                    color = "player"
                    this.player.position = new Vector2D(j, i)
                } else if(playGround_arr[i][j] == '*'){
                    color = "corn"
                    let cornPos = new Vector2D(j, i)
                    let corn = new Corn(cornPos, 2)
                    this.corns.push(corn)
                    currentRow[j].innerText = corn.count;
                }
                currentRow[j].classList = "play-field " + color
                   
            }

        }
        // this.corns.push(new Corn(new Vector2D(1, 1), 2))
        // let corn = this.playField[this.getFieldIndex(new Vector2D(1, 1))]
        // corn.classList.add("corn")
        // corn.innerText = this.corns[this.corns.length-1].count
    }

    createPlayGround() {
        for(let i = 0; i < this.terrain.dimension.size; i++){
            let div = document.createElement("div")
            div.classList.add("play-field")
            this.playGround.appendChild(div)
        }
        
        if(typeof this.playField == "undefined" || this.playField.length == 0)
            this.playField = this.playGround.querySelectorAll(".play-field")
    }

    handleResponse (response){
        
        // response = {"0":"2","1":"1","2":"3","3":"1","finished":"working"} //lay down     
        if(response == "" || typeof response == 'undefined')
            return -1
        
        if(!response.hasOwnProperty("finished")){
            swal("Ooops","Response Error", "error")
            return -1
        }

        // response = {"0":"2","1":"2","2":"1","3":"4","4":"1","5":"1","finished":"working"} //pick up

        Object.values(response).forEach((step, index) => {
            setTimeout(() => {
                this.commandCreator.startAction(step)
            }, index * this.renderDelay)
            
        });
        setTimeout(() => {
            this.playField[this.player.currentFieldIndex].innerText = this.player.corn
        }, (Object.keys(response).length-1)*this.renderDelay);
        console.log("Direction: " + getPlayerDirection(this.player.direction))
        
    }

    moveForward(){
        let currentDirection = getPlayerDirection(this.player.direction)

        switch(currentDirection){
            case "up":
                this.player.position.y--
                break
            case "left":
                this.player.position.x--
                break
            case "down":
                this.player.position.y++
                break
            case "right":
                this.player.position.x++
                break
        }

        this.updatePlayer()
    }

    getFieldIndex = function(position, height){
        let h = height || this.terrain.dimension.height
        let field = 0 
        field += position.x
        field += h*position.y

        console.log("FIELD: ", h, field, position.x, position.y)
        return field
    }

    updatePlayer(){
        
        let playerField = this.getFieldIndex(this.player.position)

        if(this.player.currentFieldIndex != playerField){
            this.playField[this.player.currentFieldIndex].classList.remove("player");
            this.playField[playerField].classList.add("player")
            
            this.player.currentFieldIndex = playerField
        }

        this.playField[this.player.currentFieldIndex].setAttribute("direction", getPlayerDirection(this.player.direction))
    }

    //Garbage-Cleaner in field
    cleanupField(){
        this.playField.forEach(element => {
            let classlist = element.classList
            if(!classlist.contains("player") && element.hasAttribute("direction")){
                element.removeAttribute("direction")
            }
            if(!classlist.contains("player") && !classlist.contains("corn") && !classlist.contains("wall")){
                element.innerText = ""
            }
        })
    }

    updateField() { //update corn count on field
        this.corns.forEach((element, index) => {
            if(element.count == 0){
                this.playField[this.getFieldIndex(element.position)].classList.remove("corn")
                this.corns.splice(index, 1)
            }
        })

        console.table(this.corns)

    }

    collectCorn = function (position) {
        this.corns.forEach((element, index) => {
            if(element.position.is(position) && element.count > 0){
                this.player.corn++
                element.count --;
                if(element.count == 0){
                    let field = this.getFieldIndex(element.position)
                    if(field == NaN)
                        return -1
                    this.playField[field].classList.remove("corn")
                    this.corns.splice(index, 1)
                }
            }
        })
    }
    
    storeCorn(position) {
        if(this.player.corn <= 0){
            alert("No corn in inventory")
            return;
        }
        
        let cornField = this.getFieldIndex(position)
        let corn = this.getCornFromPos(position)
        if(typeof corn !== 'undefined' && corn != null && corn != -1){
            let temp = this.playField[cornField].innerText
            temp = parseInt(temp) + 1
            this.playField[cornField].innerText = temp
            return;
        }

        this.corns.push(new Corn(position))
        this.playField[cornField].classList.add("corn")
        this.playField[cornField].innerText = "1"
        this.player.corn--
    }

    getCornFromPos(position){
        console.log(this.corns)
        console.warn(position)
        for(let i = 0; i < this.corns.length; i++)
            if(this.corns[i].position.is(position))
                return this.corns[i]
        
        return -1
    }

    printCorns(){
        console.log(this.corns)
    }

    printPlayer(){
        console.log(this.player)
    }

}

class Corn{
    constructor(position=new Vector2D() ,count=1){
        this.position = position
        this.count = count
    }
}

class Vector2D{
    constructor(x=0, y=0){
        this.x = x
        this.y = y
        this.is
    }

    is(position){
        return position.x == this.x && position.y == this.y
    }
    getPosString(){
        return `x: ${this.x} | y: ${this.y}`
    }
}



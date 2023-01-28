/*eslint-disable */
import { CommandCreator } from "./Command"
import {getPlayerDirection, PLAYER_DIRECTION} from '@/assets/js/utils.js'
const EventEmitter = require('events')

export default class Game extends EventEmitter{
    
    renderDelay = 500
    corns = []
    player = {
        position: new Vector2D(0, 0),
        direction: PLAYER_DIRECTION.RIGHT,
        currentFieldIndex: 0,
        corn: 0
    }

    terrain = {
        dimension: {
            width: -1,
            height: -1
        }
    }



    constructor(container, field_attribute){
        super()
        this.container = container
        this.field_attribute = field_attribute
        
        this.commandCreator = new CommandCreator()
        this.moveForward = this.moveForward.bind(this)
        this.initCommands()
    }

    initCommands(){
        this.commandCreator.createCommand("1", () => {
            this.moveForward()
        }, "Move forward by one field")

        this.commandCreator.createCommand("2", () => {
            let currentDirection = this.player.direction
            currentDirection--

            if(currentDirection < 0)
                currentDirection = PLAYER_DIRECTION.LEFT

            this.player.direction = currentDirection
            this.updatePlayer()
        }, "Player turns left")
        
        this.commandCreator.createCommand("3", () => {
            this.storeCorn(this.player.position)
        }, "Put down a corn if able")

        this.commandCreator.createCommand("4", () =>  {
            this.collectCorn(new Vector2D(this.player.position.x, this.player.position.y)) 
        }, "Pick up 1 Corn if available")

        this.commandCreator.createCommand("5", () => {
            console.warn("Action of Command with ID: " + this.id + " is undefined")
        }, "Unused for now")
        this.commandCreator.createCommand("working", () => {
            console.log("Finished!")
        }, "Success Message")
    }

    createPlayground(width=5, height=5){
        for(let i = 0; i < width*height; i++){
            let play_field = document.createElement('div')
            play_field.classList.add('play-field')
            this.container.appendChild(play_field)
        }

        // this.container.style.gridTemplateColumns += `grid-template-columns: repeat(${width}, 1fr)`
        this.container.style.gridTemplateColumns = `repeat(${width}, 1fr)`
        this.container.style.gridTemplateRows = `repeat(${height}, 1fr)`
        this.fields = this.container.querySelectorAll('.play-field')
    }

    createEntityString(terrain){
        this.resetPlayground(terrain.dimension.width, terrain.dimension.height)
        
        this.terrain.dimension = terrain.dimension;

        const terLines = terrain.playGround.split("\n")
        var playGround_arr = []

        for(let i = 2; i < terrain.dimension.height + 2; i++){
            let temp = terLines[i].split('')
            playGround_arr.push(temp)
        }
        
        let terrainObj= {
            blickrichtung: this.player.direction,
            laenge: terLines[0],
            breite: terLines[1],
            corn: [],
            cornAnzahl: [],
            wall: [],
            x: -1,
            y: -1
        }

        console.table(playGround_arr)
        let color = "white"
        for(let y = 0; y < terrain.dimension.height; y++){
            const currentRow = Array.from(this.container.querySelectorAll('.play-field')).slice(y*terrain.dimension.width, (terrain.dimension.width*(y+1)));
            for(let x = 0; x < currentRow.length; x++){
                if(typeof playGround_arr[y][x] == 'undefined' || playGround_arr[y][x] == ' ')
                    color = ""
                else if(playGround_arr[y][x] == "#"){
                    color = "wall"
                    terrainObj.wall.push([x, y])
                }else if(playGround_arr[y][x] == '>'){
                    currentRow[x].setAttribute("direction", getPlayerDirection(this.player.direction))
                    color = "player"
                    this.player.position = new Vector2D(x, y)
                    this.player.currentFieldIndex = this.getFieldIndex(this.player.position)
                    terrainObj.x = x
                    terrainObj.y = y
                } else if(playGround_arr[y][x] == '*'){
                    color = "corn"
                    let cornPos = new Vector2D(x, y)
                    let corn = new Corn(cornPos, 2)
                    this.corns.push(corn)
                    currentRow[x].innerText = corn.count;
                    terrainObj.corn.push([x,y])
                    terrainObj.cornAnzahl.push(2)
                }
                currentRow[x].classList = "play-field " + color
                    
            }

        }

        return terrainObj
    }

    createEntityObj(terrainObj){
        this.resetPlayground(terrainObj.breite, terrainObj.laenge)
        let fields = this.container.querySelectorAll(".play-field")

        this.player.direction = terrainObj.blickrichtung

        this.player.position.x = terrainObj.x
        this.player.position.y = terrainObj.y

        this.terrain.dimension.width = terrainObj.laenge
        this.terrain.dimension.height = terrainObj.breite

        for(let iWall = 0; iWall < terrainObj.wall.length; iWall++){
            fields[this.getFieldIndex(new Vector2D(terrainObj.wall[iWall][0], terrainObj.wall[iWall][1]), terrainObj.laenge)].classList = 'play-field wall'   
        }

        for(let iCorn = 0; iCorn < terrainObj.corn.length; iCorn++){
            let position = new Vector2D(terrainObj.corn[iCorn][0], terrainObj.corn[iCorn][1])
            let corn = fields[this.getFieldIndex(position, terrainObj.laenge)]
            corn.classList = 'play-field corn'
            corn.innerText = terrainObj.cornAnzahl[iCorn]
            this.corns.push(new Corn(position, terrainObj.cornAnzahl[iCorn]))
        }

        let player = fields[this.getFieldIndex(new Vector2D(terrainObj.x, terrainObj.y), terrainObj.laenge)]
        player.classList = 'play-field player'
        player.setAttribute('direction', getPlayerDirection(terrainObj.blickrichtung))

    }


    getFieldIndex (position, height){
        let h = height || this.terrain.dimension.height
        let field = 0 
        field += position.x
        field += h*position.y

        return field
    }

    resetPlayground(width, height){
        this.container.innerHTML = ''
        this.createPlayground(width, height)
        this.corns = []
    }

    updatePlayer(){
        
        let playerField = this.getFieldIndex(this.player.position)
        if(this.player.currentFieldIndex != playerField){
            this.fields[this.player.currentFieldIndex].classList.remove("player");
            this.fields[playerField].classList.add("player")
            
            this.player.currentFieldIndex = playerField
        }

        this.fields[this.player.currentFieldIndex].setAttribute("direction", getPlayerDirection(this.player.direction))
        this.cleanupField()
    }

    //Garbage-Cleaner in field
    cleanupField(){
        this.fields.forEach((element, index) => {
            let classlist = element.classList
            if(!classlist.contains("player") && element.hasAttribute("direction")){
                element.removeAttribute("direction")
            }
            if(!classlist.contains("player") && !classlist.contains("corn") && !classlist.contains("wall")){
                element.innerText = ""
            }
            if(classlist.contains('player') && index != this.player.currentFieldIndex){
                element.classList.remove('player')
            }
        })
    }

    updateField() { //update corn count on field
        this.corns.forEach((element, index) => {
            if(element.count == 0){
                this.fields[this.getFieldIndex(element.position)].classList.remove("corn")
                this.corns.splice(index, 1)
            }
        })
        this.cleanupField()
    }

    collectCorn (position) {
        console.log(this.corns)
        this.corns.forEach((element, index) => {
            if(element.position.is(position) && element.count > 0){
                this.player.corn++
                element.count --;
                let cornField = this.fields[this.getFieldIndex(position, this.terrain.dimension.height)]
                cornField.innerText = element.count
                this.emit('cornChange')
                if(element.count == 0){
                    let field = this.getFieldIndex(element.position)
                    if(field == NaN)
                        return -1
                    this.fields[field].classList.remove("corn")
                    this.corns.splice(index, 1)
                }
            }
        })
    }
    
    storeCorn(position) {
        if(this.player.corn <= 0){
            swal("", "No corn in inventory", "info")
            return;
        }

        let cornField = this.getFieldIndex(position)
        let corn = this.getCornFromPos(position)
        if(typeof corn !== 'undefined' && corn != null && corn != -1){
            let temp = this.fields[cornField].innerText
            temp = parseInt(temp) + 1
            this.fields[cornField].innerText = temp
            return;
        }

        this.corns.push(new Corn(position))
        this.fields[cornField].classList.add("corn")
        this.fields[cornField].innerText = "1"
        this.player.corn--
        this.emit('cornChange')
    }

    getCornFromPos(position){
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

    handleResponse (response){
        if(response == "" || typeof response == 'undefined')
            return -1
        
        if(!response.hasOwnProperty("finished")){
            swal("Ooops!","Response Error","error")
            return -1
        }

        Object.values(response).forEach((step, index) => {
            setTimeout(() => {
                this.commandCreator.startAction(step)
            }, index * this.renderDelay)
            
        });
    
        
    }

    moveForward(){
        let currentDirection = getPlayerDirection(this.player.direction)

        switch(currentDirection.toLowerCase()){
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
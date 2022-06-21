/*eslint-disable */

export default class Game{
    renderDelay = 500
    corns = []
    player = {
        position: new Vector2D(2, 1),
        direction: 0, //0: up | 3: right | 2: down | 1: left
        currentFieldIndex: 11,
        corn: 1
    }

    constructor(terrain, playGround, playField, player){
        this.terrain = terrain
        this.playGround = playGround
        this.playField = playField || playGround.querySelectorAll(".play-field")
        // this.player.x = player.x || 0
        // this.player.y = player.y || 0

        this.getSteps = this.getSteps.bind(this)
        this.getPlayerDirection = this.getPlayerDirection.bind(this)
        this.moveForward = this.moveForward.bind(this)
        
        this.updateField
        this.getCornFromPos
        console.log("Direction : " + this.getPlayerDirection())
    }

    getPlayerDirection(){
        switch(this.player.direction){
            case 0: 
                return "up"
            case 1: 
                return "left"
            case 2:
                return "down"
            case 3:
                return "right"
        }
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
        for(let i = 0; i < this.terrain.dimension.height; i++){
            const currentRow = Array.from(this.playField).slice(i*this.terrain.dimension.width, (this.terrain.dimension.width*(i+1)));
            for(let j = 0; j < currentRow.length; j++){
                if(typeof playGround_arr[i][j] == 'undefined' || playGround_arr[i][j] == ' ')
                    color = ""
                else if(playGround_arr[i][j] == "#")
                    color = "wall"
                else if(playGround_arr[i][j] == '>'){
                    currentRow[j].setAttribute("direction", this.getPlayerDirection())
                    color = "player"
                } else if(playGround_arr[i][j] == '*'){
                    color = "corn"
                    let cornPos = new Vector2D(i,j)
                    let corn = new Corn(cornPos, 2)
                    this.corns.push(corn)
                    currentRow[j].innerText = corn.count;
                }
                currentRow[j].classList = "play-field " + color
                   
            }

        }
        this.corns.push(new Corn(new Vector2D(1, 1), 2))
        let corn = this.playField[this.getFieldIndex(new Vector2D(1, 1))]
        corn.classList.add("corn")
        corn.innerText = this.corns[this.corns.length-1].count
    }

    createPlayGround() {
        console.log(this.player.position)
        for(let i = 0; i < this.terrain.dimension.size; i++){
            let div = document.createElement("div")
            div.classList.add("play-field")
            this.playGround.appendChild(div)
        }
        
        if(typeof this.playField == "undefined" || this.playField.length == 0)
            this.playField = this.playGround.querySelectorAll(".play-field")
    }

    getSteps(response){
        let toReturn = []
        
        for(const [key, val] of Object.entries(response)){
            toReturn.push(val)
        }
        
        return toReturn;
    }

    handleResponse (response){
        if(response == "" || typeof response == 'undefined')
            return -1
        
        response = {"0":"2","1":"1","2":"3","3":"1","finished":"working"} //lay down
        // response = {"0":"2","1":"2","2":"1","3":"4","4":"1","5":"1","finished":"working"} //pick up
        let steps = this.getSteps(response)
        console.log(Object.values(response))

        Object.values(response).forEach((element, index) => {
            setTimeout(() => {
                switch(element){
                    case "1":
                        this.moveForward()
                        break;
                    case "2":
                        this.player.direction ++
                        this.player.direction = (this.player.direction%4 == 0)? 0 : this.player.direction
                        this.updatePlayer()
                        break;
                    case "3":
                        this.storeCorn(this.player.position)
                        break;
                    case "4":
                        this.collectCorn(new Vector2D(this.player.position.x, this.player.position.y))
                        break;
                }
            }, index * this.renderDelay)
            
        });
        setTimeout(() => {
            this.playField[this.player.currentFieldIndex].innerText = this.player.corn
        }, (Object.keys(response).length-1)*this.renderDelay);
        console.log("Direction: " + this.getPlayerDirection())
    }

    moveForward(){
        let currentDirection = this.getPlayerDirection()
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
        let height = this.terrain.dimension.height;
        let x = this.player.position.x
        let y = this.player.position.y

        let playerField = this.getFieldIndex(this.player.position)

        if(this.player.currentFieldIndex != playerField){
            this.playField[this.player.currentFieldIndex].classList.remove("player");
            this.playField[playerField].classList.add("player")
            
            this.player.currentFieldIndex = playerField
        }

        this.playField[this.player.currentFieldIndex].setAttribute("direction", this.getPlayerDirection())

    }

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

    updateField() {
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

        alert(position.getPosString())

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

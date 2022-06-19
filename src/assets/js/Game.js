/*eslint-disable */

export default class Game{
    renderDelay = 500
    corns = []
    player = {
        position: new Vector2D(2, 1),
        direction: 0, //0: up | 3: right | 2: down | 1: left
        currentFieldIndex: 11,
        corn: 0
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
                    this.corns.push(new Corn(new Vector2D(i, j), 1))
                    currentRow[j].innerText = 1;
                }
                currentRow[j].classList = "play-field " + color
                   
            }

        }
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
        
        response = {"0":"2","1":"2","2":"1","3":"4","finished":"working"}
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
                    case "4":
                        this.collectCorn(this.player.position.x, this.player.position.y)
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

    collectCorn = function (position) {
        console.log("körner: ", this.corns.length, position)
        console.log(this.corns)
        this.corns.forEach(element => {
            if(element.position = position && element.count > 0){
                this.player.corn++
                element.count --;
                if(element.count == 0){
                    let field = this.getFieldIndex(element.position)
                    if(field == NaN)
                        return -1
                    this.playField[field].classList.remove("corn")
                }
            }
        })
    }
}

class Corn{
    constructor(position ,count){
        this.position = position
        this.count = count
    }
}

class Vector2D{
    constructor(x, y){
        this.x = x || 0
        this.y = y || 0
    }
}

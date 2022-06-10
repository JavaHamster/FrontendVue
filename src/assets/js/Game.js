/*eslint-disable */

export default class Game{
    renderDelay = 500
    corns = []
    player = {
        x: 2,
        y: 1,
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
                    this.corns.push(new Corn(i, j, 1))
                    currentRow[j].innerText = 1;
                }
                currentRow[j].classList = "play-field " + color
                   
            }

        }
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
        
        response = {"0":"2","1":"2","2":"1","3":"1","4":"1","5":"1","finished":"working"}
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
                }
            }, index * this.renderDelay)
            
        });
        console.log("Direction: " + this.getPlayerDirection())
    }

    moveForward(){
        let currentDirection = this.getPlayerDirection()
        switch(currentDirection){
            case "up":
                this.player.y--
                break
            case "left":
                this.player.x--
                break
            case "down":
                this.player.y++
                break
            case "right":
                this.player.x++
                break
        }

        this.updatePlayer()
    }

    updatePlayer(){
        let height = this.terrain.dimension.height;
        let x = this.player.x
        let y = this.player.y

        let playerField = 0

        playerField += x
        playerField += height*y

        if(this.player.currentFieldIndex != playerField){
            this.playField[this.player.currentFieldIndex].classList.remove("player");
            this.playField[playerField].classList.add("player")
            this.player.currentFieldIndex = playerField
        }

        this.playField[this.player.currentFieldIndex].setAttribute("direction", this.getPlayerDirection())
        
    }
}

class Corn{
    constructor(x, y, count){
        this.x = x
        this.y = y
        this.count = count
    }

}

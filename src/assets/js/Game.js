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
                    let corn = new Vector2D(i,j)
                    this.corns.push(new Corn(corn, 1))
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
        
        response = {"0":"2","1":"1","2":"3","3":"1","finished":"working"}
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

        let playerField = this.getFieldIndex(new Vector2D(x, y))
        
        if(this.player.currentFieldIndex != playerField){
            this.playField[this.player.currentFieldIndex].classList.remove("player");
            this.playField[playerField].classList.add("player")
            
            this.player.currentFieldIndex = playerField
        }

        this.playField[this.player.currentFieldIndex].setAttribute("direction", this.getPlayerDirection())

    }

    updateField() {
        console.table(this.corns)
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
                    console.log(field)
                    this.playField[field].classList.remove("corn")
                    this.corns.splice(index, 1)
                }
            }
        })
    }
    storeCorn(position) {
        console.warn(this.corns)
        let cornField = this.getFieldIndex(position)
        let corn = this.corns.find(e => e.position == position)
        console.error(typeof corn )
                       
        if(corn != NaN || corn != null || typeof corn === 'undefined'){
            this.playField[cornField].innerText = corn.count
            alert("kdlajf")
            return;
        }

        // this.corns.push(new Corn(position))
        // this.playField[cornField].classList.add("corn")
        // this.playField[cornField].innerText = "1"
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
}

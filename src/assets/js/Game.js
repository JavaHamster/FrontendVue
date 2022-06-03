/*eslint-disable */


export default class Game{
    player = {
        x: 0,
        y: 0,
    }
    constructor(terrain, playGround, playField, player){
        this.terrain = terrain
        this.playGround = playGround
        this.playField = playField || playGround.querySelectorAll(".play-field")
        // this.player.x = player.x || 0
        // this.player.y = player.y || 0
        this.getSteps = this.getSteps.bind(this)
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
                else if(playGround_arr[i][j] == '>')
                    color = "player"
                else if(playGround_arr[i][j] == '*')
                    color = "corn"
                currentRow[j].classList = "play-field " + color
            }

        }
    }

    createPlayGround() {
        console.log("size: " + this.terrain.dimension.size)
        console.log(this.playGround)
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
        
        response = {"0":"12","1":"1","10":"1","2":"1","3":"1","4":"1","5":"1","6":"1","7":"1","8":"1","9":"1","finished":"working"}
        let steps = this.getSteps(response)
        console.log(steps)
    }

    
}

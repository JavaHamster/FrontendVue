<template>
    <div>
        <h1>{{hello}}</h1>
        <div class="play-ground"></div>
        <EditorMonaco/>
    </div>
</template>

<script>
import EditorMonaco from "../components/EditorMonaco.vue"
export default {
components: {
    EditorMonaco
},
props : {
    
},
data() {
    return {
        hello : "Welcome to the Play Ground",
        terrain : {
        dimension : {
            width: 10,
            height: 10,
            size : null
        },
        playGround : "10\n10\n##        \n >        \n  *       \n  *       \n          \n          \n          \n          \n          \n          \n0\n1\n1\n0\n"
    }
    }
},
beforeMount() {
    this.terrain.dimension.size = this.terrain.dimension.width * this.terrain.dimension.height
},
mounted() {
    this.createPlayGround()
    this.loadEntities()
},
methods : {
    loadEntities : function() {

        const terLines = this.terrain.playGround.split("\n")
        const playfields = this.getPlayGroundArray()
        var playGround = []
        console.log(this.terrain.playGround)

        for(let i = 2; i < this.terrain.dimension.height + 2; i++){
            let temp = terLines[i].split('')
            playGround.push(temp)
        }

        console.table(playGround)

        let color = "white"
        for(let i = 0; i < this.terrain.dimension.height; i++){
            const currentRow = Array.from(playfields).slice(i*this.terrain.dimension.width, (this.terrain.dimension.width*(i+1)));
            for(let j = 0; j < currentRow.length; j++){
                if(typeof playGround[i][j] == 'undefined' || playGround[i][j] == ' ')
                    color = "white"
                else if(playGround[i][j] == "#")
                    color = "black"
                else if(playGround[i][j] == '>')
                    color = "blue"
                else if(playGround[i][j] == '*')
                    color = "brown"
                currentRow[j].style.background = color
            }

        }
    },
    getPlayGroundArray : function () {
        const playGround_HTML = document.querySelector(".play-ground")
        return playGround_HTML.querySelectorAll(".play-field")
    },
    createPlayGround : function() {
        console.log("size: " + this.terrain.dimension.size)
        const playGround_HTML = document.querySelector(".play-ground")

        for(let i = 0; i < this.terrain.dimension.size; i++){
            let div = document.createElement("div")
            div.classList.add("play-field")
            playGround_HTML.appendChild(div)
        }
    }
}
}
</script>

<style>
.play-ground {
    display: grid;
    grid-template-columns: repeat(10, 50px);
    grid-template-rows: repeat(10, 50px);
}
.play-field {
    border: 1px solid black;
    width: 50px;
    height: 50px;
}
</style>
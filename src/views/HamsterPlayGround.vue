<template>
    <div>
        <h1>{{hello}}</h1>
        <div class="flex-container">
            <div class="play-ground"></div>
            <code-editor/>
        </div>
    </div>
</template>

<script>
import CodeEditor from '../components/RichEditor.vue'
import Game from '../assets/js/Game.js'
export default {
components: {
    CodeEditor
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
        playGround : "10\n10\n###   ####\n >        \n  *       \n  *       \n          \n          \n          \n          \n          \n          \n0\n1\n1\n0\n",
        content: "<h1>Some initial content</h1>"
    }
    }
},
beforeMount() {
    this.terrain.dimension.size = this.terrain.dimension.width * this.terrain.dimension.height
},
mounted() {
    let playGround_HTML = document.querySelector(".play-ground")
    var game = new Game(this.terrain, playGround_HTML)
    game.createPlayGround()
    game.loadEntities()
    game.handleResponse(" ")
},
methods : {
    
        
}
}
</script>

<style lang="scss">

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
    &.corn{
        background: brown;
    }
    &.wall {
        background: black;
    }
    &.player {
        background: blue;
    }
}
.flex-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly
}
</style>
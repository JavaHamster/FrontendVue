<template>
    <div>
        <button v-on:click="clickevent()" class="btn">
            Add Task
        </button>
        <div v-if="this.show">
            <h1>Visible</h1>
        </div>
    </div>
</template>

<script>
export default {
    name : 'ButtonVue',
    data() {
        return {
            show : true
        }
    },
    methods : {
        clickevent() {
            this.show = !this.show
        }
    }
}
</script>
<template>
    <div class="game-builder-build-option">
        <ButtonSwitchVue v-for="(_switch, index) in switches" :key="_switch.id" :_id="_switch.id" :text="_switch.name" :icon_url="_switch.icon_url" :checked="index === 0"/> 
    </div>
</template>


<script>
import ButtonSwitchVue from './ButtonSwitch.vue';
export default {
    components: {
        ButtonSwitchVue
    },
    data() {
        return {

        }
    },
    props: {
        switches: {
            require: true
        }
    },
    methods: {

    },
    mounted() {
        console.log(this.switches)
    }

}
</script>

<style lang="scss">
    .game-builder-build-option {
        transform: scale(1.5);
        display: flex;
        gap: 2em;
    }
</style>
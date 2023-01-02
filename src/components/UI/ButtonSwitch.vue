<template>
    <div class="switch-container">
        <input type="radio" class="switch" name="mode" :id="_id" :checked="checked">
        <label :for="_id">
            <p v-if="icon_url == ''">{{text}}</p>
            <img class="image svg" v-else :src="icon_url" :title="text">
        </label>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: "",
        }
    },
    props: {
        text: {
            require: true
        },
        _id: {
            require: true
        },
        icon_url: {
            require: false
        },
        checked: {
            require: false
        }

    },
    created() {
        this.id = `input-${Math.random()}`
    },
}
</script>

<style lang="css"> 
    .switch-container {
        width: fit-content;
    }
    input[type='radio'].switch {
        display: none;
    }

    input[type='radio'].switch + label {
        position: relative;
        user-select: none;
        display: flex;
        font-size: 20px;
        align-items: center;
    }

    input[type='radio'].switch + label::before{
        content: '';
        width: 2em;
        height: 1em;
        border-radius: 1em;
        margin-right: .25em;
        background-color: hsl(0, 80%, 90%);
    }

    input[type='radio'].switch + label::after{
        content: '\2715';
        color: white;
        position: absolute;
        left: .2em;
        width: 1.7em;
        aspect-ratio: 1/1;
        border-radius: 1em;
        background-color: hsl(0, 80%, 60%);
        transition: transform 200ms ease-out, background-color 200ms ease-in-out;

        display: flex;
        font-size: .5em;
        align-items: center;
        justify-content: center;
    }

    input[type='radio'].switch:checked + label::after{
        content: '\2713';
        transform: translateX(100%);
        background-color: hsl(100, 60%, 55%)
    }

    input[type='radio'].switch:checked + label::before{
        background: hsl(100, 60%, 90%);
    }

    .image.svg {
        width: 1em;
        aspect-ratio: 1/1;
        object-fit: cover;
    }


</style>
<template>
    <div class="slider-container">
        <div class="current-value-container flex-centered">
            <span class="current-value flex-centered">
                <p ref="current_value_p">FILLER</p>
            </span>
        </div>
        <div class="slider flex-centered">
            <p class="min-paragraph">{{min_size}}</p>
            <input ref="range_input" type="range" :min="min_size" :max="max_size" step="1" @input="onInputChange">
            <p class="max-paragraph">{{max_size}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        max_size: {
            default: 15
        },
        min_size: {
            default: 1
        }
    },
    methods: {
        onInputChange(e){
            this.$refs.current_value_p.innerText = e.currentTarget.value
        }
    },
    mounted() {
        var value = Math.round((this.max_size-this.min_size)/2)
        if(this.max_size %2 != 0)
            value++

        this.$refs.current_value_p.innerText = value
        this.$refs.range_input.value = value
    }
}

</script>

<style lang="scss" scoped>
    $main-color: #FD8A8A;
    $current-value-visibility: visible;

    .flex-centered {
        display: flex;
        align-items: center;
        justify-content:center;
    }

    .slider-container {
        padding-block: 1rem;
        padding-inline: 2.5rem;
        width: 200px;
        height: 40px;
        background-color: white;
        border-radius: 1.2rem;

        &:hover {
            $current-value-visibility: hidden;
        }
    }

    .slider {
        position: relative;
        

        & input {
            position: absolute;
            appearance: none;
            background: #ddd;
            outline: none;
            border: none;
            height: 4px;   
            top: 50%;
            margin-top: 12.5%;

            &::-webkit-slider-thumb {
                appearance: none;
                width: 17px;
                aspect-ratio: 1/1;
                background: $main-color;
                border-radius: 50%;
            }
        }


        & .min-paragraph {
            position: absolute;
            left: 0px;
            top: 50%;
        }

        & .max-paragraph {
            position: absolute;
            right: 0px;   
            top: 50%;
        }
    }

    .current-value-container {
        visibility: $current-value-visibility;
        & .current-value {
            position: absolute;
            width: 40px;
            aspect-ratio: 1/1;
            background-color: $main-color;
            transform: rotate(45deg) translate(-35%, -35%);
            border: solid 3px white;
            outline: none;
            color: white;
            box-sizing: border-box;

            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
            border-top-right-radius: 50%;

            & p {
                padding: 0;
                margin: 0;
                transform: rotate(-45deg)
            }
        }
    }
</style>
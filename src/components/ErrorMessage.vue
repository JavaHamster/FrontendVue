<template>
  <div class="error-wrapper">
    <span class="error-message"> {{message}}</span>
  </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: "Error: No Error"
        }
    }
}
</script>

<style scoped>
    .error-wrapper {
        background: rgba(229, 107, 111, .5);
        padding-inline: 2rem;
        padding-block: 1rem;
        border-radius: 1rem;
        width: max-content;
        margin-bottom: 1rem
    }
    .error-message {
        font-weight: bold;
    }
</style>
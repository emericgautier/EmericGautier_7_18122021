<template>
    <img v-if="!!media" alt="media de la publication" :src="mediaUrl">
</template>

<script>
    export default {
        name: 'PostMedia',
        props: ['media'],
        computed: {
            mediaUrl() {
                return 'http://localhost:3000/' + this.media
            }
        }
    }
</script>

<style scoped>
    img {
        margin-top: 1rem;
        max-width: 512px;
        max-height: 512px;
        border-radius: 2px;
        border: 2px solid white;
    }   
</style>
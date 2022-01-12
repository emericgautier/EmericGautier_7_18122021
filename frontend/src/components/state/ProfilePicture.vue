<template>
    <img class="user-pic" alt="Photo de profil" :width="width" :height="height" :src="pictureUrl">
</template>

<script>
    export default {
        name: "ProfilePicture",
        props: ['src', 'width', 'height'],
        computed: {
            pictureUrl() {
                return 'http://localhost:3000/' + this.src
            }
        }
    }
</script>

<style scoped>
    img {
        border-radius: 50%;
        border: 2px solid white;
        object-fit: cover;
        background-color: white;
    }
</style>
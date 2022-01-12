<template>
    <div id="profile-menu">
        <a v-if="posts" class="link active" @click="$emit('posts')"> Publications </a>
        <a v-else class="link" @click="$emit('posts')"> Publications </a>
        <a v-if="comments" class="link active" @click="$emit('comments')"> Réponses </a>
        <a v-else class="link" @click="$emit('comments')"> Réponses </a>
    </div>
</template>

<script>

    export default {
        name: 'Menu',
        emits: ['posts', 'comments'],
        props: ['posts', 'comments'],
    }

</script>

<style scoped>

    #profile-menu {
        background-color: #212529;
        display: flex;
        padding: 1rem;
        column-gap: 1rem;
        border-top: 2px solid white;
    }

    .link {
        color: white;
        cursor: pointer;
        text-transform: uppercase;
        opacity: 0.35;
    }

    .active { 
        color: #fd2d01;
        opacity: 1;
    }

    @media screen and (min-width: 640px) { 
        #profile-menu {
            border-left: 2px solid white;
            padding-left: 3rem;
        }
    }

</style>
<template>
    <p v-if="!!content">{{ content }}</p>
</template>

<script>
    export default {
        name: 'PostContent',
        props: ['content']
    }
</script>

<style scoped>

    p {
        margin-bottom: 0;
    }

</style>
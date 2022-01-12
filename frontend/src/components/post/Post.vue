<template>
    <div id="post">
        <Header />
        <Post :id="id"/>
        <Submit :id="id" />
        <Comment :id="id" />
    </div>
</template>

<script>

import Header from '@/components/post/items/Header'
import Post from '@/components/post/items/Post'
import Submit from '@/components/post/items/Submit'
import Comment from '@/components/post/items/Comment'

export default {
    name: "Posts",
    components: {
        Header, Post, Submit, Comment
    },
    props: ['id'],
}

</script>

<style scoped>

    #post {
        display: grid;
        grid-template-rows: auto auto 256px 1fr;
    }

</style>

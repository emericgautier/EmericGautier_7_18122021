<template>
    <div id="home">
        <Header />
        <Submit />
        <Post :feeds="feeds"/>
    </div>
</template>

<script>

import Header from '@/components/home/items/Header'
import Submit from '@/components/home/items/Submit'
import Post from '@/components/home/items/Post'

export default {
    name: "Home",
    components: {
        Header, Submit, Post
    },
    data () {
        return {
            feeds: [],
            posts: [],
            author: []
        }
    },
    async mounted(){

        const posts = await fetch('http://localhost:3000/' + 'api/posts', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })    

        if (posts.status == 200) {
            this.posts = await posts.json()
            this.posts.forEach( async (post) => {

                const owner = await fetch('http://localhost:3000/' + `api/user/owner?id=${post.user_id}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                })

                const author = await fetch('http://localhost:3000/' + `api/post/author?id=${post.user_id}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                })

                this.author = await author.json()

                var obj = {...post, isOwner: owner.ok, ...this.author}

                await this.feeds.push(obj)
            })
        }
    }
}

</script>

<style scoped>

    #home {
        display: grid;
        grid-template-rows: auto auto 1fr;
    }

</style>

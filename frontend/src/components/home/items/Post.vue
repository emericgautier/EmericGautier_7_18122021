<template>
    <div id="posts">
        <div id="posts-body">
            <router-link :to="'/post/' + feed.id" v-for="feed in feeds" :key="feed.id">
                <article>
                    <div class="user-infos">
                        <router-link :to="'/profile/' + feed.name">
                            <ProfilePicture :src="feed.imageUrl" :width="64" :height="64" />
                        </router-link>   
                        <div class="content-header">
                            <router-link :to="'/profile/' + feed.name">
                                <FormattedUsername :name="feed.name" />
                            </router-link>
                            <FormattedDate :date="feed.createdAt" />
                        </div>
                        <div class="content-options">
                            <button v-if="feed.isOwner" aria-label="Suppression" id="submit" class="me-2 btn btn-outline-danger" type="submit" @click.prevent="deletePost(feed.id)"><i class="fas fa-trash-alt"></i></button>
                        </div>      
                    </div>
                    <div class="post-content">
                        <hr>
                        <PostContent :content="feed.post_content" />
                        <PostMedia :media="feed.post_media" />
                    </div>
                </article>
            </router-link>
            <Wik />
        </div> 
    </div>
</template>

<script>

    import ProfilePicture from '@/components/state/ProfilePicture'
    import FormattedDate from '@/components/state/FormattedDate'
    import FormattedUsername from '@/components/state/FormattedUsername'
    import PostContent from '@/components/state/PostContent'
    import PostMedia from '@/components/state/PostMedia'
    import Wik from '@/components/state/Wik'

    import axios from 'axios'

    export default {
        name: 'Post',
        components: { 
            ProfilePicture, FormattedDate, FormattedUsername, PostContent, PostMedia, Wik
        },
        props: ['feeds'],
        methods: {
            deletePost(post) {
                axios
                .delete('http://localhost:3000/' + `api/comments/delete/post?id=${post}`, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })
                .then(() => {
                    axios
                    .delete('http://localhost:3000/' + `api/post/delete?id=${post}`, {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    })
                    .then(() => {
                        window.location.reload()
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    }

    

</script>

<style scoped>
    
    #posts {
        text-align: left;
        background-color: #212529;
    }

    #posts-body {
        border: 1px solid white;
        border-right: none;
        border-left: none;
    }

    #posts-body article {
        border-bottom: 1px solid white;
        border-radius: 3px;
        padding: 32px;
    }

    #posts-body article:hover {
        background-color: #2c2c2c;
        transition: 0.5s;
    }

    .user-infos {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr auto;
        align-items: center;
        column-gap: 1rem;
    }

    .content-options {
        display: flex;
        align-items: center;
    }

    .post-content p {
        margin-bottom: 0;
    }

    .post-content img {
        max-width: 512px;
        max-height: 512px;
        margin-top: 1rem;
        border-radius: 2px;
        border: 2px solid white;
    }

    a {
        text-decoration: none;
        color: white;
    }

    .content-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .content-header a {
        font-weight: bold;
    }

    .content-header a:hover {
        text-decoration: underline;
    }

    @media screen and (max-width: 640px) { 
        #posts {
            margin-bottom: 2.5rem;
        }
    }

    @media screen and (min-width: 640px) { 
        #posts {
            border-left: 2px solid white;
        }
    }

</style>
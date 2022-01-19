<template>
    <div id="posts">
        <div id="posts-body">
            <router-link :to="'/post/' + post.id" v-for="post in posts" :key="post.id">
                <article>
                    <div class="user-infos">
                        <router-link :to="'/profile/' + user.name">
                            <ProfilePicture :src="user.imageUrl" :width="64" :height="64"/>
                        </router-link>  
                        <div class="content-header">
                            <router-link :to="'/profile/' + user.name">
                                <FormattedUsername :name="user.name" />
                            </router-link>
                                <FormattedDate :date="post.createdAt" />
                        </div>
                        <div class="content-options">
                            <button v-if="isOwner" aria-label="Suppression" id="submit" class="btn btn-outline-danger me-2" type="submit" @click.prevent="deletePost(post.id)"><i class="fas fa-trash-alt"></i></button>
                        </div>       
                    </div>
                    <div class="post-content">
                        <hr>
                        <PostContent :content="post.post_content" />
                        <PostMedia :media="post.post_media" />
                    </div>
                </article>
            </router-link>
            <Wik />
        </div> 
    </div>
</template>

<script>

    import ProfilePicture from '@/components/state/ProfilePicture'
    import FormattedUsername from '@/components/state/FormattedUsername'
    import FormattedDate from '@/components/state/FormattedDate'
    import PostContent from '@/components/state/PostContent'
    import PostMedia from '@/components/state/PostMedia'
    import Wik from '@/components/state/Wik'

    import axios from 'axios'

    export default {
        name: 'Post',
        components: {
            ProfilePicture, FormattedUsername, FormattedDate, PostContent, PostMedia, Wik
        },
        props: ['posts', 'user', 'isOwner'],
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
        background-color: #0F0F10;
        text-align: left;
        border-bottom: none;
    }

    #posts-body {
        border-top: 2px solid white;
        border-bottom: none;
        border-right: none;
        border-left: none;
    }

    #posts-body article {
        border-bottom: 1px solid white;
        border-radius: 3px;
        padding: 1rem;
    }

    #posts-body article:hover {
        background-color: #2c2c2c;
        transition: 0.5s;
    }

    .user-infos{
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr auto;
        column-gap: 1rem;
        align-items: center;
    }


    .content-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    a:hover {
        text-decoration: none;
        color: white;
    }

    .content-options {
        display: flex;
        align-items: center;
    }
    
    @media screen and (min-width: 640px) { 
        #posts {
            border-left: 2px solid white;
        }

        #posts-body article {
            padding-left: 3rem;
        }
    }

    @media screen and (max-width: 640px) { 
        .user-pic {
            height: 48px;
            width: 48px;
        }

        #posts {
            margin-bottom: 3rem;
        }
    }

    

</style>
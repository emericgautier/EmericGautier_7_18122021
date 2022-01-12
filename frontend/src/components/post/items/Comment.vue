<template>
    <div id="comments">
        <div id="comments-body">
            <article v-for="feed in feeds" :key="feed.id">
                <div class="user-infos">
                    <router-link :to="'/profile/' + feed.name">
                        <ProfilePicture :src="feed.imageUrl" :width="64" :height="64" />
                    </router-link>
                    <div class="comment-header">
                        <router-link :to="'/profile/' + feed.name">
                            <FormattedUsername :name="feed.name" />
                        </router-link>
                        <br>
                        <FormattedDate :date="feed.createdAt" />
                    </div>  
                    <div class="content-options">
                        <button v-if="feed.isOwner" aria-label="Suppression" id="submit" class="me-2 btn btn-outline-danger" type="submit" @click.prevent="deleteComment(feed.id)"><i class="fas fa-trash-alt"></i></button>
                    </div> 
                </div>
                <div class="comment-content">
                    <hr>
                    <PostContent :content="feed.comment_content" />
                    <PostMedia :media="feed.comment_media" />
                </div>
            </article>
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
        name: 'Comment', 
        components: {
            ProfilePicture, FormattedUsername, FormattedDate, PostContent, PostMedia, Wik
        },
        props: ['id'],
        data () {
            return {
                feeds: [],
                comments: [],
                author: [],
            }
        },
        async mounted(){
            const comments = await fetch('http://localhost:3000/' + `api/comments/post?id=${this.id}`, {
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include'
            })    
            if (comments.status == 200) {
                this.comments = await comments.json()
                this.comments.forEach( async (comment) => {

                    const owner = await fetch('http://localhost:3000/' + `api/user/owner?id=${comment.user_id}`, {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include'
                    })

                    const author = await fetch('http://localhost:3000/' + `api/post/author?id=${comment.user_id}`, {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                    })

                    this.author = await author.json()
                    var obj = {...comment, isOwner: owner.ok, ...this.author}
                    await this.feeds.push(obj)
                })
            }
        },
        methods: {
            deleteComment(comment) {
            
                axios
                .delete('http://localhost:3000/' + `api/comment/delete?id=${comment}`, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })
                .then(() => {
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    }

</script>

<style scoped>
    
    #comments {
        background-color: #212529;
        text-align: left;
        color: white;
        height: 100%;
    }

    #comments-body {
        border: 1px solid white;
        border-left: none;
        border-right: none;
        border-radius: 3px;
    }

    #comments-body article {
        padding: 32px;
        border-bottom: 1px solid white;
        border-radius: 3px;
    }

    a {
        text-decoration: none;
        color: white;
        font-weight: bold;
    }

    .comment-content a:hover {
        text-decoration: underline;
    }

    .user-infos {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr auto;
        column-gap: 1rem;
        align-items: center;
    }

    @media screen and (min-width: 640px) { 
        #comments {
            border-left: 2px solid white;
        }
    }

    @media screen and (max-width: 640px) { 
        #comments {
            margin-bottom: 2.5rem;
        }
    }

</style>
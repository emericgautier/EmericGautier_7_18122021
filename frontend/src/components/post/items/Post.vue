<template>

    <div id="post-container">
        <div class="user-infos">
            <router-link :to="'/profile/' + post.name">
                <ProfilePicture v-if="isReceived" :src="post.imageUrl" :width="64" :height="64" />
            </router-link>
            <div class="content-header">
                <router-link :to="'/profile/' + post.name">
                    <FormattedUsername v-if="isReceived" :name="post.name" />
                </router-link>
                <br>
                <FormattedDate v-if="isReceived" :date="post.createdAt" />
            </div>
            <div class="content-options">
                <button v-if="post.isOwner" aria-label="Suppression" id="submit" class="btn btn-outline-danger me-2" type="submit" @click.prevent="deletePost(post.id)"><i class="fas fa-trash-alt"></i></button>
            </div>          
        </div>
        <div class="post-content">
            <hr>
            <PostContent :content="post.post_content" />
            <PostMedia :media="post.post_media" />
        </div>
    </div>
 
</template>

<script>

 
    import ProfilePicture from '@/components/state/ProfilePicture'
    import FormattedDate from '@/components/state/FormattedDate'
    import FormattedUsername from '@/components/state/FormattedUsername'
    import PostContent from '@/components/state/PostContent'
    import PostMedia from '@/components/state/PostMedia'

    import axios from 'axios'

    export default {
        name: 'Post',
        components: { 
            ProfilePicture, FormattedDate, FormattedUsername, PostContent, PostMedia
        },
        props: ['id'],
        data () {
            return {
                post: {},
                isReceived: false,
                isOwner: false
            }
        },
        async mounted(){
            const post = await fetch('http://localhost:3000/' + `api/post?id=${this.id}`, {
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include'
            })
            if (post.status == 200) {
                
                let answer = await post.json()
                
                const owner = await fetch('http://localhost:3000/' + `api/user/owner?id=${answer.post.user_id}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                })

                this.post = {...answer.post, isOwner: owner.ok, ...answer.user}

                this.isReceived = true
            }
        },
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
                        this.$router.push('/home')
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
    
    #post-container {
        background-color: #0F0F10;
        text-align: left;
        color: white;
        border-bottom: 1px solid white;
        border-radius: 3px;
        padding: 32px;
    }

    #posts-body {
        border: 1px solid white;
        border-left: none;
        border-right: none;
        border-radius: 3px;
    }

    #post-container {
        border-bottom: 1px solid white;
        border-radius: 3px;
        padding: 32px;
    }

    a {
        text-decoration: none;
        color: white;
    }

    .user-infos {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr auto;
        column-gap: 1rem;
    }

    .content-options {
        display: flex;
        align-items: center;
    }

    .post-content a {
        font-weight: bold;
    }

    .post-content a:hover {
        text-decoration: underline;
    }

    @media screen and (min-width: 640px) { 
        #post-container {
            border-left: 2px solid white;
        }
    }

</style>
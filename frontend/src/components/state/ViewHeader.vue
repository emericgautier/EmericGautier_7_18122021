<template>
    <div id="header" class="p-3 px-2 bg-dark text-white">
        <div id="header__container">
            <a v-if="!isHomepage && window.width > 640" @click="$router.go(-1)">
                <i class="fas fa-arrow-left"></i>
            </a>
            <h1 v-if="isHomepage || window.width < 640">{{ title }}</h1>
            <h1 v-else> | {{ title }}</h1>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ViewHeader',
        props: ['title', 'page'],
        computed: {
            isHomepage() {
                if (this.page == 'home') {
                    return true
                } else {
                    return false
                }
            }
        },
        data() {
            return {
                window: {
                    width: 0,
                    height: 0
                }
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        methods: {
            handleResize() {
                    this.window.width = window.innerWidth;
                    this.window.height = window.innerHeight;
            }
        },
    }

</script>

<style scoped>
    #header {
        display: flex;
        border-bottom: 2px solid white;
        align-items: baseline;
    }

    #header__container{
        display: grid;
        grid-template-columns: auto auto 1fr;
        grid-column-gap: 1rem;
        align-content: center;
        align-items: baseline;
        margin-left: 1rem;
        color: #fd2d01;
    }

    h1 {
        font-size: 24px;
    }

    a {
        cursor: pointer;
    }

    @media screen and (min-width: 640px) { 
        #header {
            border-left: 2px solid white;
        }
    }
</style>
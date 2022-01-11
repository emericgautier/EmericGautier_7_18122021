<template>
    <header class="text-white bg-dark">
        <nav>
            <ul>
                <a v-if="$route.name != 'home'" @click="$router.go(-1)">
                    <i class="fas fa-arrow-left"></i>
                </a>
                <Link url="/home" icon="fas fa-home" text="" />
                <Link :url="profile" icon="fas fa-user-circle" text="" />
                <li>
                    <a href="/" @click.prevent="logout"><i class="fas fa-sign-out-alt"></i></a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>

import {useRouter} from 'vue-router'

import Link from '@/components/header/items/Link'

export default {
  
    name: "Desktop",
    props: ['profile'],
    components: {
        Link
    },
    setup() {
      
        const router = useRouter();

        const logout = async () => {
            await fetch('http://localhost:3000/' + 'api/user/logout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
            router.push('/')
        }

        return {
            logout
        }
    }
}

</script>

<style scoped>

    header {
            grid-row: 2/3;
            position: fixed;
            width: 100%;
            height: 3rem;
            z-index: 999;
            bottom: 0;
            padding: 1rem;
            border-top: 2px solid white;
    }

    i {
        color: white;        
        font-size: 20px;
    }

    ul {
        display: flex;
        list-style: none;
        justify-content: space-evenly;
        padding-left: 0;
    }

</style>


<template>

    <div class="modal modal-signin bg-secondary py-5" tabindex="-1" role="dialog" id="landingpage-page">
        <div class="modal-dialog" role="document">
            <router-view />
        </div>
    </div>

</template>

<script>

import {useRouter} from 'vue-router'

export default {
    name: "Landingpage",
    async mounted(){

        const router = useRouter();

        const user = await fetch('http://localhost:3000/' + 'api/user/auth', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
        })
        
        if (user.status == 200) {
            router.push('/home')
        }
    },
}

</script>

<style>

    #landingpage-page {
        background: url('../assets/landingpage.jpeg') no-repeat center center fixed;
        background-size: cover;
        display: flex;
        align-items: center;
    }

    .modal-header {
        flex-direction: column; 
    }

    .bi {
        vertical-align: -.125em;
        fill: currentColor;
    }

    .rounded-4 { border-radius: .5rem; }
    .rounded-5 { border-radius: .75rem; }
    .rounded-6 { border-radius: 1rem; }

    .modal-sheet .modal-dialog {
        width: 380px;
        transition: bottom .75s ease-in-out;
    }
    .modal-sheet .modal-footer {
        padding-bottom: 2rem;
    }

    .modal-alert .modal-dialog {
        width: 380px;
    }

    .border-right { border-right: 1px solid #eee; }

    .modal-tour .modal-dialog {
        width: 380px;
    }

    .modal-dialog {
        position: relative;
        width: auto;
        margin: .5rem auto;
        pointer-events: none;
    }

    @media (min-width: 576px) {
        .modal-dialog {
            max-width: 500px;
            width: 100%;
            margin: 1.75rem auto;
        }
    }

</style>

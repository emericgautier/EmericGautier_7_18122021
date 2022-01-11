<template>
    <div id="logout">
        <hr>
        <button type="button" aria-label="Déconnexion" class="btn btn-outline-danger me-2" @click="logout"><i :class="icon"></i></button>
    </div>
</template>

<script>

import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
    name: "Button",
    props: ['icon'],
    setup() {
      
        const store = useStore();

        const router = useRouter();

        const auth = computed( () => store.state.authenticated)

        const logout = async () => {

          await fetch('http://localhost:3000/' + 'api/user/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
          });
          
          await store.dispatch('setAuth', false)
          router.push('/')

        }

        return {
            auth, logout
        }
    }
}

</script>

<style scoped>

#logout {
    grid-row: 5/6;
}

</style>
<template>

<div class="modal-content rounded-5 shadow">
    <div class="modal-header pb-4 p-5 border-bottom-0">
        <img width="300" alt="black logo groupomania" src="@/assets/icon-above-font.png" />  
        <hr class="my-4">
        <h2 class="fw-bold mb-0">Inscription</h2>
    </div>
    <div class="modal-body p-5 pt-0">
        <form @submit.prevent="submit">
            <div class="form-floating mb-3">
                <input v-model="data.name" type="text" class="form-control rounded-4" placeholder="ex. Nathan" required> 
                <label for="floatingInput">Nom d'utilisateur</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="data.email" type="email" class="form-control rounded-4" placeholder="ex. name@example.com" required> 
                <label for="floatingInput">Adresse mail</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="data.password" type="password" class="form-control rounded-4"  placeholder="ex. Nathan7777" required>
                <label for="floatingPassword">Mot de passe</label>
            </div>
            <div hidden id="message" class="alert" role="alert"></div>
            <button class="w-100 mb-2 btn btn-lg rounded-4 btn-danger" aria-label="Inscription" type="submit">S'inscrire</button>
            <hr class="my-4">
            <h2 class="fs-5 fw-bold mb-3">Déja membre ? 🙂</h2>
            <router-link to="/">
                <button type="button" aria-label="Connexion" class="w-100 py-2 mb-2 rounded-4 btn btn-outline-dark">Se connecter</button>
            </router-link>
        </form>
    </div>
</div>

</template>

<script>

import {reactive} from 'vue'
import {useRouter} from 'vue-router'

export default {
    name: "Register",
    setup() {
        const data = reactive({
            name: '',
            email: '',
            password: ''
        });

        const router = useRouter();

        const submit = async () => {
            const answer = await fetch('http://localhost:3000/' + 'api/user/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            let message = document.getElementById('message')

            if (answer.status == 200) { 
                
                if (message.classList.contains('alert-danger')) { message.classList.replace('alert-danger', 'alert-success') }
                else { message.classList.add("alert-success") }
                message.textContent = "Création du compte réussie..."
                message.hidden = false
                setTimeout(function() {
                    router.push('/') 
                }, 3000);

            } else {

                message.textContent = "Votre nom d'utilisateur / adresse email est déjà utilisée"
                message.classList.add("alert-danger")
                message.hidden = false

            }
        }
     
        return {
            data,
            submit
        }
    }
}
</script>

<style scoped>


</style>

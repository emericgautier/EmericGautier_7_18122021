<template>
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h2>Editer mon profil</h2>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">

              <div class="section">
                <h3> Médias du profil </h3>
                <div id="banner-container">
                  <div id="banner" v-if="user.bannerUrl" :style="{ 'background-image': 'url(' + bannerUrl + ')' }" @click="selectBanner">
                    <i class="fas fa-image"></i>
                    <input hidden name="banner" ref="profileBanner" type="file" @change="readBanner"> 
                  </div>
                  <div id="banner" v-else @click="selectBanner">
                    <i class="fas fa-image"></i>
                    <input hidden name="banner" ref="profileBanner" type="file" @change="readBanner"> 
                  </div>
                  <div id="picture">
                    <div id="picture-container">
                      <i class="fas fa-portrait"></i>
                      <ProfilePicture :src="user.imageUrl" @click.prevent="selectFile" :width="64" :height="64" />
                      <input hidden name="image" ref="profilePicture" type="file" @change="readURL">
                    </div>
                  </div>
                </div>
              </div>

              <div class="section" id="description">
                <h3> Description </h3>
                <label for="content"></label>
                <form method="post" @submit.prevent="submit">
                  <textarea v-model="description"></textarea>
                </form>
              </div>

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div id="buttons-left">
                <button class="btn btn-outline-danger me-2" aria-label="Suppression" @click="deleteProfile"><i class="fas fa-trash"></i></button>
              </div>
              <div id="buttons-right">
                <button id="submit" aria-label="Fermerture" class="btn btn-outline-success me-2" type="submit" @click.prevent="submit"><i class="far fa-save"></i></button>
                <button class="btn btn-outline-light me-2" aria-label="Fermeture" @click="$emit('close')"><i class="far fa-window-close"></i></button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  import ProfilePicture from '@/components/state/ProfilePicture'

  import axios from 'axios'
  
  export default {
    name: 'Modal',
    components: {
      ProfilePicture
    },
    data () {
      return {
        description: '',
        id: ''
      }
    },
    props: ['modal', 'user'],
    async mounted() {
      
      this.description = this.user.description
      this.id = this.user.id

    },
    methods: {
              submit() {
                
                const data = {
                  description: this.description,
                  user_id: this.id
                }

                axios
                .put('http://localhost:3000/' + `api/user/update`, data, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })
                .then(() => {
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error)
                })

            },
            deleteProfile() {

              axios
              .delete('http://localhost:3000/' + `api/comments/delete/user?id=${this.user.id}`, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
              })
              .then(() => {
                axios
                .delete('http://localhost:3000/' + `api/posts/delete/user?id=${this.user.id}`, {
                  headers: {'Content-Type': 'application/json'},
                  withCredentials: true
                })
                .then(() => {
                  axios
                  .delete('http://localhost:3000/' + `api/user/delete?id=${this.user.id}`, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                  })
                  .then((res) => {
                    switch (res.data.role) {
                      case 'moderator':
                        this.$router.push('/home')
                        break
                      case 'user' :
                        this.$router.push('/')
                        break
                    }
                  })
                  .catch((error) => {
                    console.log(error)
                  })
                })
                .catch((error) => {
                  console.log(error)
                })
              })
              .catch((error) => {
                console.log(error)
              })

            },
            selectFile(){
                let fileInputElement = this.$refs.profilePicture
                fileInputElement.click()
            },
            readURL() {
                
                this.file = this.$refs.profilePicture.files[0];
                
                const data = new FormData()
                
                data.append("image", this.file, this.file.name)

                axios
                .put('http://localhost:3000/' + `api/user/picture?username=${this.user.name}`, data, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })
                .then(() => {
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error)
                })
            },
            selectBanner(){
                let fileInputElement = this.$refs.profileBanner
                fileInputElement.click()
            },
            readBanner() {
                
                this.file = this.$refs.profileBanner.files[0];
                
                const data = new FormData()
                
                data.append("image", this.file, this.file.name)

                axios
                .put('http://localhost:3000/' + `api/user/banner?username=${this.user.name}`, data, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })
                .then(() => {
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error)
                })
            },
        },
        computed: {
            bannerUrl() {
                return 'http://localhost:3000/' + this.user.bannerUrl
            }
        }
  }

</script>

<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-footer {
  justify-content: space-between;
}

.modal-container {
  width: 85%;
  max-width: 728px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #0F0F10;
  border: 2px solid white;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
    flex-direction: row;
}

.modal-header h2 {
  margin-top: 0;
  color: white;
  text-align: left;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

#banner {
    height: 128px;
    width: 100%;
    background-color: #fd2d01;
    border-radius: 2px;
    border: 2px solid white;
    cursor: pointer;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

#banner:hover {
  filter: grayscale(100%);
  transition: 0.15s;
}

#banner i {
  position: absolute;
  top: 50%;
  left: 48.5%;
  font-size: 32px;
  color: white;
  opacity: 0;
}

#banner:hover > i {
  opacity: 1;
  transition: 0.15s;
}

#picture {
  position: absolute;
  bottom: 25%;
  left: 1rem;
  cursor: pointer;
}

#picture-container {
  position: relative;
}

#picture:hover {
  filter: grayscale(100%);
  transition: 0.15s;
}

#picture:hover > #picture-container > i {
  opacity: 1;
  transition: 0.15s;
}

#picture-container i {
  top: 40%;
  left: 40%;
  position: absolute;
  color: white;
  opacity: 0;
  font-size: 16px;
}

.section {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: 1px solid white;
}

#banner-container {
  position: relative;
}

.section h3 {
  margin-bottom: 1rem;
  width: 100%;
  text-align: left;
  color: white;
}

#description {
  border-bottom: none;
  margin-top: 1rem;
}

#description textarea {
  width: 100%;
  background-color: rgb(33, 37, 41);
  color: white;
  resize: none;
  padding: 1rem;
  height: 100%;
}

::placeholder {
  color: white;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
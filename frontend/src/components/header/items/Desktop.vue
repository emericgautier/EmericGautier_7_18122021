<template>
  <header id="sidebar" class="p-3 bg-dark text-white">
    <div id="sidebar-container">
      <div v-if="sb_collapsed" id="sidebar-collapsed">
        <Logo />
        <hr>
        <nav id="menu">
          <ul>
            <Link url="/home" icon="fas fa-home" text="Accueil" />
            <Link :url="profile" icon="fas fa-user-circle" text="Profil" />
          </ul>
        </nav>
        <Button icon="fas fa-sign-out-alt" />
      </div>
      <button id="collapse" aria-label="Menu latéral" type="button" class="btn" @click="collapse">
        <i v-if="sb_collapsed" class="fas fa-angle-left"></i>
        <i v-if="!sb_collapsed" class="fas fa-angle-right"></i>
      </button>
    </div>
  </header>
</template>

<script>

import Logo from '@/components/header/items/Logo'
import Link from '@/components/header/items/Link'
import Button from '@/components/header/items/Button'

export default {
  
    name: "Header",
    components: {
      Logo, Link, Button
    },
    data() {
      return {
        sb_collapsed: false,
      }
    },
    methods: {
      collapse() {
        const bar = document.getElementById('sidebar')
        switch (this.sb_collapsed) {
          case false:
            bar.style.width = "304px";
            this.sb_collapsed = true
            break
          case true:
            bar.style.width = "20px";
            this.sb_collapsed = false
            break
        }
      }
    },
    props: ['profile']
}

</script>

<style scoped>

    #menu {
        margin-top: 2rem;
    }

    #menu ul {
        list-style: none;
        display: grid;
        grid-template-rows: auto auto;
        row-gap: 1rem;
    }

    #sidebar-container {
      display: grid;
      grid-template-rows: auto auto auto 1fr auto;
      max-height: 100vh;
      position: relative
    }

    #sidebar-collapsed {
      display: grid;
      grid-template-rows: auto auto auto 1fr auto;
    }

    #collapse {
      position: absolute;
      top: 50%;
      right: -15px;
      color: white;
    }

    li {
        display: flex;
    }

    #menu ul li a {
        column-gap: 1rem;
    }

    #sidebar {
        height: 100%;
        max-height: 100%;
        width: 20px;
        transition: 0.5s;
        display: flex;
        justify-content: flex-end;
        position: relative;
    }

    .fas {
        font-size: 24px;
    } 

</style>
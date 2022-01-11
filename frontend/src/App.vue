<template>

    <router-view />

</template>

<script>



  export default {

  }

</script>

<style lang="scss">
 
  html, body, #app{
    height: 100%;
  }

  // app

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  // sign-in

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }

  a {
        text-decoration: none;
        color: white;
    }

  .btn-danger {
    background-color: #fd2d01;
  }

</style>
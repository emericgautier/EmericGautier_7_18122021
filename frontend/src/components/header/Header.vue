<template>

  <Desktop v-if="window.width > 640" :profile="profile" />
  <Mobile v-else :profile="profile" />
  
</template>

<script>

import Desktop from '@/components/header/items/Desktop'
import Mobile from '@/components/header/items/Mobile'

export default {
  
    name: "Header",
    components: {
      Desktop, Mobile
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
    props: ['profile']
}

</script>

<style scoped>


</style>

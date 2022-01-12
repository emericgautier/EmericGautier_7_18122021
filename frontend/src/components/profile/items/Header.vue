<template>
    <ViewHeader :title="title" :page="page" />
</template>

<script>

    import ViewHeader from '@/components/state/ViewHeader'

    export default {
        name: 'Header',
        data() {
            return {
                page: 'profile',
                title: 'Profil'
            }
        },
        components: {
            ViewHeader
        }
    }

</script>

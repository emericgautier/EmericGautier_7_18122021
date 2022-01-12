<template>
    <span>{{ formattedUsername }}</span>
</template>

<script>

    export default {
        name: 'FormattedUsername',
        props: ['name'],
        data() {
            return {
                formattedUsername: ''
            }
        },
        async mounted() {
            this.formattedUsername = this.name[0].toUpperCase() + this.name.substring(1);
        }
    }   

</script>

<style scoped>

    span {
        font-weight: bold;
    }

    span:hover {
        text-decoration: underline;
    }

</style>

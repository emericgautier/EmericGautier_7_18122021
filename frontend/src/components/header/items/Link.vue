<template>
    <li>
        <router-link :to="url" isExactActive>
            <i :class="icon"></i> {{ text }}
        </router-link>
    </li>
</template>

<script>

export default {
    name: "Link",
    props: ['url', 'icon', 'text'],
}

</script>

<style scoped>

    .router-link-exact-active {
            color: #fd2d01;
    }

    a {
        display: flex;
        text-decoration: none;
        align-items: baseline;
        color: white;
        column-gap: 1rem;
        font-size: 1.25rem;
    }

</style>
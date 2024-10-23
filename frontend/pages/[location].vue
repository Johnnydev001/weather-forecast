<template>
    <Hero :locationToFind="routeLocation"/>
</template>

<script setup lang="ts">
import Hero from '~/components/hero/hero.vue';

const route = useRoute();
const routeLocation = computed(() => route?.params?.location);

</script>
<style lang="css">
html,
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    background-color: #005183;
    color: #ffffff;
}
</style>
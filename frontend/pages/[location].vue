<template>

    <Suspense>

        <template #default>
            <Hero :locationToFind="routeLocation" />
        </template>


        <template #fallback>
            <Overlay/>
        </template>

        <template #pending>
            <Overlay/>

        </template>

    </Suspense>


</template>

<script setup lang="ts">
import Hero from '~/components/hero/hero.vue';
import Overlay from '~/components/overlay/overlay.vue';

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
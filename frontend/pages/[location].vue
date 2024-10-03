<template>
   <div class="hero-container">
        <WeatherStatus :locationToFind="locationToFind" />
    </div>
</template>

<script setup lang="ts">
import WeatherStatus from '~/components/weather-status/weather-status.vue';

const route = useRoute();
const locationToFind = ref<string|string[]|undefined>(route.params?.location ?? "")
</script>
<style lang="css">
html,
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0
}
.hero-container {
    background-color: #427bff;
}
</style>
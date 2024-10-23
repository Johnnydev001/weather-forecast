<template>
    <div class="hero-container">
        <WeatherStatus :locationToFind="locationToFind"/>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
  locationToFind: String,
});

const locationToFind = ref(props?.locationToFind);

watch(() => props?.locationToFind, (newLocation) => {
  locationToFind.value = newLocation;
});
</script>

<style lang="scss">
.hero-container {
    font-family: 'Roboto', sans-serif;
    background-color: #427bff;
}
</style>

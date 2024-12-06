<template>
    <article class="hero-container">
        <WeatherStatus :locationToFind="locationToFind"/>
    </article>
</template>

<script setup lang="ts">

const props: {readonly locationToFind?: any} = defineProps(['locationToFind']) ;

const locationToFind = ref(props?.locationToFind);

watch(() => props?.locationToFind, (newLocation) => {
  locationToFind.value = newLocation;
});
</script>

<style lang="scss">
.hero-container {
    font-family: 'Roboto', sans-serif;
    background-color: #427bff;
    height: 100%;
}
</style>

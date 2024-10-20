<template>
    <div class="hero-container">
        <WeatherStatus :locationToFind="props"/>
    </div>
</template>

<script lang="ts">
import { defineProps } from 'vue';

const props = defineProps(['locationToFind']);
console.log(props)

</script>

<style lang="scss">
.hero-container {
    font-family: 'Roboto', sans-serif;
    background-color: #427bff;
}
</style>

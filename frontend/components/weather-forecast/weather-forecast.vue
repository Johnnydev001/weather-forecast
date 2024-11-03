<template>

    <section class="forecast-container">

        <h4 class="title">
            Next five days forecast:
        </h4>

        <ul class="list" >
            <li  v-for="forecast in nextFiveForecasts">

                <WeatherForecastItem :forecast="forecast" />

            </li>
        </ul>

    </section>

</template>

<script setup lang="ts">
const nextFiveForecasts = ref([{
    weather: {
        main: 'clouds',
        description: 'descp',
    },
    clouds: 10,
    wind_speed: 15,
    humidity: 15,
    pressure: 10
},
{
    weather: {
        main: 'clouds',
        description: 'descp',
    },
    clouds: 10,
    wind_speed: 15,
    humidity: 15,
    pressure: 10
}])


</script>

<style lang="scss" scoped>
.forecast-container {
    border-top: $border;
    margin-top: 1rem;

    .title {
        font-weight: 300;
        font-size: 1.1rem;
    }

    .list {
        list-style: none;
        display: flex;
        gap: 0.5rem;
    }

}
</style>
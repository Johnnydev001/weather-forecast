<template>

    <section class="forecast-container">

        <h4 class="title">
            Next five days forecast:
        </h4>

        <ul class="list">
            <li v-for="forecast in nextFiveForecasts">

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
    minTemp: 10,
    maxTemp: 15,
},
{
    weather: {
        main: 'clouds',
        description: 'descp',
    },
    minTemp: 10,
    maxTemp: 15,
},
{
    weather: {
        main: 'clouds',
        description: 'descp',
    },
    minTemp: 10,
    maxTemp: 15,
}, {
    weather: {
        main: 'clouds',
        description: 'descp',
    },
    minTemp: 10,
    maxTemp: 15,
},
{
    weather: {
        main: 'rain',
        description: 'descp',
    },
    minTemp: 20,
    maxTemp: 25,
}])


</script>

<style lang="scss" scoped>
@media only screen and (max-width: 425px) {
    .list {
        display: flex !important;
        flex-direction: column;

    }
}

.forecast-container {

    border-top: $border;
    margin-top: 1rem;

    .title {
        font-weight: 300;
        font-size: 1.1rem;
    }

    .list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 1rem;
        max-width: 425px;

        text-align: center;
        justify-content: center;

        list-style: none;

        justify-items: center;
        padding: 0;


    }

}
</style>
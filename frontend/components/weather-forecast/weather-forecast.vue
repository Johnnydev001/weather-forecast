<template>

    <section class="forecast-container" >

        <h4  class="title">
            Next five days forecast:
        </h4>

        <ul class="list">
            <li v-for="item in weatherForecast">

                <WeatherForecastItem :item="item" />

            </li>
        </ul>

    </section>

</template>

<script setup lang="ts">
const weatherForecast = useState('weatherForecast')


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
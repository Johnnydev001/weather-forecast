<template>

    <section class="forecast-container">

        <h4 class="title">
            Next 5 days forecast:
        </h4>

        <ul class="list">
            <li v-for="item in weatherForecast">

                <WeatherForecastItem :item="item" />

            </li>
        </ul>



    </section>

</template>

<script setup lang="ts">
const props = defineProps(['weatherForecast'])
const weatherForecast = computed(() => props?.weatherForecast)

</script>

<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
    .list {
        display: flex !important;
        flex-direction: column;
    }

}

::-webkit-scrollbar {
    max-width: 1px;
    height: 7px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #dcdcdc;
    /* Color of the scrollbar track */
}

/* Thumb */
::-webkit-scrollbar-thumb {
    background-color: #0b487d;
    border-radius: $radius;
    border: $border;
}


::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}

.forecast-container {

    border-top: $border;
    margin-top: 1rem;

    .title {
        font-weight: 300;
        font-size: 1.1rem;
    }


    .list {
        border-radius: $radius;
        display: flex;
        margin: 1rem;
        max-width: 25rem;
        overflow-x: auto;

        text-align: center;

        list-style: none;

        justify-items: center;
        padding: 0;

    }

}
</style>
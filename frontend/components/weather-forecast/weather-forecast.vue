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
@media only screen and (max-width: 580px) {
    .list {
        display: flex !important;
        flex-direction: column;
        border-right: none !important;
    }

    .list li {
        border-right: none !important;
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
        background-color: rgb(255, 255, 255, 0.1);
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

    .list li {
        border-right: $border;
    }

}
</style>
<template>

    <section role="grid" class="container">

        <h1 class="date">{{ formatedTodayDate }}</h1>

        <div class="temperature-container">
            <h2 class="temperature">{{ temperature }}</h2>

            <p class="feels-like-temperature">Feels like: {{ feelsLikeTemperature }}</p>
        </div>

        <h3 class="weather-status">{{ weatherStatus }}</h3>

        <article class="weather-container">

            <div class="sub-container">
                <div class="condition">
                    <WindIcon/>

                    <div class="value">
                        <span class="title">Wind</span>
                        <span>{{ windSpeed }}</span>
                    </div>

                </div>

                <div class="condition">
                    <HumidityIcon/>
                    <div class="value">
                        <span class="title">Humidity</span>
                        <span>{{ humidity }}</span>

                    </div>


                </div>
            </div>

            <div class="sub-container">
                <div class="condition">
                    <PressureIcon/>
                    <div class="value">
                        <span class="title">Pressure</span>
                        <span>{{ pressure }}</span>
                    </div>

                </div>

                <div class="condition">
                    <UVIndexIcon/>
                    <div class="value">
                        <span class="title">UV index</span>
                        <span>{{ uvIndex }}</span>
                    </div>

                </div>
            </div>

        </article>

    </section>

</template>

<script setup lang="ts">
import WindIcon from '~/assets/icons/wind.vue';
import PressureIcon from '~/assets/icons/pressure.vue';
import UVIndexIcon from '~/assets/icons/sun.vue';
import HumidityIcon from '~/assets/icons/humidity.vue'

import { monthsMappedToNumbers } from '~/utils/constants/constants';
import { ref } from 'vue';

const todayDate = new Date();

const monthFromTodayDate = monthsMappedToNumbers.find((elem) => elem?.index === todayDate.getMonth())?.elem;
const formatedTodayDate = ref(`Today, ${todayDate.getDay()}, ${monthFromTodayDate}`)

const temperature = ref("29º")
const feelsLikeTemperature = ref("30º")
const weatherStatus = ref("sunny")
const windSpeed = ref("30km/h")
const humidity = ref("10%")
const pressure = ref("0")
const uvIndex = ref("2")

</script>

<style lang="scss">
.container {
    display: grid;
    text-align: center;
    // color: #ffffff;
    border: 1px solid #ffffff;

    .date {
        font-weight: 100;

    }

    .temperature-container {
        .temperature {
            font-weight: 700;
            text-shadow: red;
        }

        .feels-like-temperature {
            font-weight: 500;
        }
    }

    .weather-status {
        font-weight: 700;
        text-transform: capitalize;
    }

    .weather-container {
        text-align: center;
        justify-content: center;
        display: grid;

        .sub-container {
            display: grid;
            grid-template-columns: 10rem 10rem;

            .condition {
                display: flex;
                column-gap: 1rem;
                align-items: center;
                border: 0.5px solid #8e8e8e;
                border-radius: 0.25rem;
                padding: 0.75rem;

                .value {
                    display: grid;
                    row-gap: 0.5rem;

                    .title {
                        font-weight: 600;
                    }
                }
            }
        }


    }

}
</style>
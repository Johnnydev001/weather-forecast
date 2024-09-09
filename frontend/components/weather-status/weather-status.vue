<template>

    <section role="grid" class="container">


        <article class="sub-container">

            <img class="weather-illustration" src="~/public/assets/imgs/sun.png" alt="Weather summary image" />


            <article class="summary-container">
                <h2 class="date">{{ formatedTodayDate }}</h2>
                <h2 :title=feelsLikeTemperature class="temperature">{{ temperature }}</h2>
                <h3 class="weather-status">{{ weatherStatus }}</h3>
            </article>

            <article class="weather-container">

                <div class="condition-container">
                    <div class="condition">
                        <WindIcon />

                        <div class="value">
                            <span class="title">Wind</span>
                            <span>{{ windSpeed }}</span>
                        </div>

                    </div>

                    <div class="condition">
                        <HumidityIcon />
                        <div class="value">
                            <span class="title">Humidity</span>
                            <span>{{ humidity }}</span>

                        </div>
                    </div>
                </div>

                <div class="condition-container">
                    <div class="condition">
                        <PressureIcon />
                        <div class="value">
                            <span class="title">Pressure</span>
                            <span>{{ pressure }}</span>
                        </div>

                    </div>

                    <div class="condition">
                        <UVIndexIcon />
                        <div class="value">
                            <span class="title">UV index</span>
                            <span>{{ uvIndex }}</span>
                        </div>

                    </div>
                </div>

            </article>
        </article>

    </section>

</template>

<script setup lang="ts">
import WindIcon from '~/public/assets/icons/wind.vue';
import PressureIcon from '~/public/assets/icons/pressure.vue';
import UVIndexIcon from '~/public/assets/icons/sun.vue';
import HumidityIcon from '~/public/assets/icons/humidity.vue'
import weatherService from '~/services/weather/weather-service';

import { monthsMappedToNumbers } from '~/utils/constants/constants';
import { ref } from 'vue';

const todayDate = new Date();

const monthFromTodayDate = monthsMappedToNumbers.find((elem) => elem?.index === todayDate.getMonth())?.elem;
const formatedTodayDate = ref(`Today, ${todayDate.getDay()}, ${monthFromTodayDate}`)

const temperature = ref("29º")
const feelsLikeTemperature = ref("Feels like: 30º")
const weatherStatus = ref("sunny")
const windSpeed = ref("30km/h")
const humidity = ref("10%")
const pressure = ref("0")
const uvIndex = ref("2")
const cloudsPercentage = ref("0%")

const navigator = ref(window?.navigator);
const latitude = ref(0);
const longitude = ref(0);

navigator?.geolocation?.getCurrentPosition((position) => {
  longitude.value = position?.coords?.longitude;
  latitude.value = position?.coords?.latitude;
});

try {
    const weatherResponse = await weatherService.getOneCallWeather( {lat : latitude, lon : longitude, lang: 'pt', units: 'metric'} )
    if (weatherResponse){
      temperature.value = weatherResponse?.temperature;
      feelsLikeTemperature.value = weatherResponse?.feelsLikeTemperature;
      weatherStatus.value = weatherResponse?.weatherStatus;
      windSpeed.value = weatherResponse?.windSpeed;
      humidity.value = weatherResponse?.humidity;
      pressure.value = weatherResponse?.pressure;
      cloudsPercentage.value = weatherResponse?.cloudsPercentage;
    }

} catch (error) {
    console.log('error client side', error)
}

</script>

<style lang="scss">
.container {
    display: grid;
    row-gap: 1rem;
    text-align: center;
    justify-items: center;
    padding: 5rem;
    color: #000000;
    background-image: url('public/assets/imgs/background-cloudy.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    .sub-container {
        background-color: #ffffff;
        display: grid;
        row-gap: 1rem;
        text-align: center;
        justify-items: center;
        padding: 2rem;
        border: $border;
        border-radius: 1rem;

        .weather-illustration {
            aspect-ratio: 10/9;
            object-fit: contain;
            object-position: center;
            max-width: 200px;
        }

        .summary-container {
            display: grid;
            justify-items: center;
            text-align: center;
            align-items: center;
            row-gap: 1.5rem;

            .date {
                font-weight: 100;
                font-size: 1rem;
                margin: 0;
            }

            .temperature {
                font-weight: 500;
                font-size: 4rem;
                margin: 0;
                text-shadow: -3px 6px 35px rgba(0, 0, 0, 0.1);
            }

            .weather-status {
                font-weight: 300;
                font-size: 2rem;
                text-transform: capitalize;
                margin: 0;
            }
        }

        .weather-container {
            margin-top: 2rem;
            text-align: center;
            justify-content: center;
            display: grid;


            .condition-container {
                display: grid;
                grid-template-columns: 10rem 10rem;
                column-gap: 1rem;
                margin: 1rem;

                .condition {
                    display: flex;
                    column-gap: 1rem;
                    align-items: center;
                    border: 0.5px solid #000000;
                    border-radius: 0.25rem;
                    padding: 0.75rem;

                    >svg {
                        aspect-ratio: 1;
                        object-fit: contain;
                        width: 1.5rem;
                        stroke: #000000;
                    }

                    .value {
                        display: grid;
                        row-gap: 0.5rem;

                        .title {
                            font-weight: 600;
                        }
                    }
                }

                .condition:first-child {
                    border-left: none;
                }

                .condition:last-child {
                    border-right: none;
                }
            }


        }
    }

}
</style>
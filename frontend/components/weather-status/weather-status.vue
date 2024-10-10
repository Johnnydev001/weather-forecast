<template>

    <section class="container">

        <section class="sub-container">
            <div class="location-container">
                <div >
                    <span class="location">{{ city ? city  +', ': '' }}</span>
                    <span class="location">{{ country   }}</span>
                </div>
                
                <span class="date">{{  formatedTodayDate }} </span>
            </div>

            <img class="weather-illustration" src="~/public/assets/imgs/sun.png" alt="Weather summary image" />

            <section class="summary-container">

                <h3 title="Temperature. Units - metric: Celsius" class="temperature">{{ temperature }}º</h3>

                <h4 title="Feels like temperature. Units - metric: Celsius" class="feels-like-temperature">Feels like: {{
                    feelsLikeTemperature ? feelsLikeTemperature + 'º': '0º'}}</h4>

            </section>

            <article class="weather-container">

                <div class="condition-container">
                    <div class="condition" title="The current wind speed in km/h">
                        <WindIcon />

                        <div class="value">
                            <span class="title">Wind speed</span>
                            <span>{{ windSpeed }} KM/H</span>
                        </div>

                    </div>

                    <div class="condition" title="The current humidity of the air in %">
                        <HumidityIcon />
                        <div class="value">
                            <span class="title">Humidity</span>
                            <span>{{ humidity }} %</span>

                        </div>
                    </div>
                </div>

                <div class="condition-container">
                    <div class="condition" title="Atmospheric pressure on the sea level, hPa">
                        <PressureIcon />
                        <div class="value">
                            <span class="title">Pressure</span>
                            <span>{{ pressure }} hPa</span>
                        </div>

                    </div>

                    <div class="condition" title="The current UV index">
                        <UVIndexIcon />
                        <div class="value">
                            <span class="title">UV index</span>
                            <span>{{ uvIndex }}</span>
                        </div>

                    </div>
                </div>

            </article>
        </section>

    </section>

</template>

<script setup lang="ts">
import WindIcon from '~/public/assets/icons/wind.vue';
import PressureIcon from '~/public/assets/icons/pressure.vue';
import UVIndexIcon from '~/public/assets/icons/sun.vue';
import HumidityIcon from '~/public/assets/icons/humidity.vue'

import { monthsMappedToNumbers } from '~/utils/constants/constants';
import { ref } from 'vue';


const handleFindLocationByName = async (locationToFind: string) => {
    try {

        const locationResponse = await $fetch('/api/location', {
            method: 'GET',
            params: {
                query: locationToFind
            }
        })
        if(locationResponse?.address){
            country.value = locationResponse.address?.country;
            city.value = locationResponse?.address?.city || locationResponse?.address?.name;
            latitude.value = locationResponse.lat;
            longitude.value = locationResponse.lon;
        }        

    } catch (error) {
        console.log('Failed to get the location data from the server due to: ', error);
    }
}

const handleWeatherRequest = async () => {
    try {

        const weatherResponse = await $fetch('/api/weather', {
          method: 'POST',
          body: {
            lat: latitude.value,
            lon: longitude.value,
            lang: 'pt',
            units: 'metric'
          }
        })
        if (weatherResponse) {
            temperature.value = weatherResponse?.temperature;
            feelsLikeTemperature.value = weatherResponse?.feelsLikeTemperature;
            weatherStatus.value = weatherResponse?.weatherStatus;
            windSpeed.value = weatherResponse?.windSpeed;
            humidity.value = weatherResponse?.humidity;
            pressure.value = weatherResponse?.pressure;
            cloudsPercentage.value = weatherResponse?.cloudsPercentage;
        }

    } catch (error) {
        console.log('Failed to get the weather data from the service due to: ', error)
    }

}

const props = defineProps(['locationToFind'])

const navigator = ref(window?.navigator);
const latitude = ref<string|number>(0);
const longitude = ref<string|number>(0);

const todayDate = new Date();

const monthFromTodayDate = monthsMappedToNumbers.find((elem) => elem?.index === todayDate.getMonth())?.elem;
const formatedTodayDate = ref(`Today, ${todayDate.getDay()}, ${monthFromTodayDate}`)

const temperature = ref(0)
const feelsLikeTemperature = ref(0)
const windSpeed = ref(0)
const humidity = ref(0)
const pressure = ref(0)
const uvIndex = ref(0)
const cloudsPercentage = ref(0)

const weatherStatus = ref("")

const city = ref<string | undefined>("");
const country = ref<string | undefined>("");

await handleFindLocationByName(props?.locationToFind);
await handleWeatherRequest();

</script>

<style lang="scss">
.container {
    font-family: 'Roboto', sans-serif;
    display: grid;
    row-gap: 1rem;
    text-align: center;
    justify-items: center;
    padding: 5rem;
    color: #000000;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url("public/assets/imgs/background-cloudy.jpg");

    .sub-container {
        background-color: #ffffff;
        display: grid;
        row-gap: 1rem;
        text-align: center;
        justify-items: center;
        padding: 2rem;
        border: $border;
        border-radius: 0.5rem;

        .location-container {
            display: grid;
            row-gap: 1rem;

            .date {
                font-weight: 100;
                font-size: 1rem;
                margin: 0;
            }
            .location {
                font-weight: 100;
                font-size: 1.3rem;
                margin: 0;
            }
        }

       

        .weather-illustration {
            aspect-ratio: 11/9;
            object-fit: contain;
            object-position: center;
            max-width: 200px;
        }

        .summary-container {
            display: grid;
            justify-items: center;
            text-align: center;
            align-items: center;
            row-gap: 1rem;

            

            .temperature {
                font-weight: 500;
                font-size: 4rem;
                margin: 0;
                text-shadow: 1px 2px 2px gray;

            }

            .feels-like-temperature {
                font-weight: 500;
                font-size: 1.5rem;
                margin: 0;
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
                    box-shadow: 0px 1px 4px gray;

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
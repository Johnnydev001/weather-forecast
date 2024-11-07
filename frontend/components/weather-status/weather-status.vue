<template>

    <section class="container" :style="containerStyle">

                <section class="sub-container">
                    <div class="location-container">
                        <div>
                            <span class="location-city">{{ city ? city + ', ' : '' }}</span>
                            <span class="location-country">{{ country }}</span>
                        </div>

                        <span class="date">{{ formatedTodayDate }} </span>
                    </div>

                    <NuxtImg class="weather-illustration" :src="iconByWeatherStatus" :alt="weatherDescription"
                        :title="weatherDescription" />

                    <section class="summary-container">

                        <h3 title="Temperature. Units - metric: Celsius" class="temperature"
                            :style="{ color: temperature > 18 ? 'orange' : 'rgb(100, 177, 255)' }">{{ temperature }}º
                        </h3>

                        <div class="feels-like-temperature-container">
                            <span>Feels like:</span>
                            <h4 title="Feels like temperature. Units - metric: Celsius" class="feels-like-temperature"
                                :style="{ color: feelsLikeTemperature && feelsLikeTemperature > 18 ? 'orange' : 'rgb(100, 177, 255)' }">
                                {{
                                    feelsLikeTemperature ? feelsLikeTemperature + 'º' : '0º' }}</h4>
                        </div>


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

                        <div v-if="weatherForecast.length">
                            <WeatherForecast :weatherForecast="weatherForecast" />
                        </div>

                    </article>
                </section>



    </section>

</template>

<script async setup lang="ts">
import WindIcon from '~/public/assets/icons/wind.vue';
import PressureIcon from '~/public/assets/icons/pressure.vue';
import UVIndexIcon from '~/public/assets/icons/sun.vue';
import HumidityIcon from '~/public/assets/icons/humidity.vue'
import WeatherForecast from '~/components/weather-forecast/weather-forecast.vue'

import { monthsMappedToNumbers } from '~/utils/constants/constants';
import { ref } from 'vue';
import { getImageUrlByWeatherStatus } from '~/utils/utils'

const handleFindLocationByName = async (locationToFind: string) => {
    try {

        const { data: locationResponse } = await useAsyncData('location', () =>
            $fetch('/api/location', {
                method: 'GET',
                params: {
                    query: locationToFind
                }
            })
        )

        if (locationResponse?.value?.address) {
            country.value = locationResponse?.value?.address?.country;
            city.value = locationResponse?.value?.address?.city || locationResponse?.value?.address?.name;
            latitude.value = locationResponse?.value?.lat;
            longitude.value = locationResponse?.value?.lon;
        }
    } catch (error) {
        console.error('Failed to get the location data from the server due to: ', error);
    }
}

const handleWeatherRequest = async () => {
    try {

        const { data: weatherResponse } = await useAsyncData('current', async () =>

            await $fetch('/api/weather', {
                method: 'POST',
                params: {
                    weatherType: 'current'
                },
                body: {
                    lat: latitude.value,
                    lon: longitude.value,
                    lang: 'en',
                    units: 'metric'
                }
            }),
            {
                watch: [latitude, longitude]
            }

        )

        if (weatherResponse.value) {

            temperature.value = weatherResponse?.value?.temperature;
            feelsLikeTemperature.value = weatherResponse?.value?.feelsLikeTemperature;
            windSpeed.value = weatherResponse?.value?.windSpeed;
            humidity.value = weatherResponse?.value?.humidity;
            pressure.value = weatherResponse?.value?.pressure;
            cloudsPercentage.value = weatherResponse?.value?.cloudsPercentage;
            weatherMainStatus.value = weatherResponse?.value?.weatherMainStatus?.toLowerCase();
            weatherDescription.value = weatherResponse?.value?.weatherDescription?.toUpperCase();
            weatherForecast.value = weatherResponse?.value?.daily?.splice(1, 5);
        }

    } catch (error) {
        console.error('Failed to get the current weather data from the service due to: ', error)
    }

}

const props = defineProps(['locationToFind'])

const latitude = ref<string | number>(0);
const longitude = ref<string | number>(0);

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

const weatherMainStatus = ref("")
const weatherDescription = ref("")
const weatherForecast = useState('weatherForecast', () => [])

const city = ref<string | undefined>("");
const country = ref<string | undefined>("");
const iconByWeatherStatus = computed(() => (
    getImageUrlByWeatherStatus(weatherMainStatus.value, true)
))

const containerStyle = computed(() => ({
    backgroundImage: `url(${getImageUrlByWeatherStatus(weatherMainStatus.value, false)})`,
}))

const router = useRoute()

watch(() => props?.locationToFind, (newLocation) => {
    if (newLocation) {
        city.value = newLocation;
    }
});

if (!router.redirectedFrom) {
    await handleFindLocationByName(props?.locationToFind);
}
await handleWeatherRequest();

</script>

<style lang="scss" scoped>
@media only screen and (max-width: 425px) {
    .condition-container {
        display: flex !important;
        flex-direction: column;
    }
}

.container {
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    text-align: center;
    justify-items: center;
    padding: 5rem 10rem 15rem 10rem;
    color: #000000;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    justify-content: center;
    align-items: center;
    height: 100%;

    .sub-container {
        min-width: 15rem;
        max-width: 30rem;
        width: 100%;

        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        text-align: center;
        justify-items: center;
        padding: 4rem;
        border-radius: $radius;
        border: $border;

        background: rgb(0, 0, 30, 0.1);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        color: #ffffff;
        font-family: 'Roboto', sans-serif;

        .location-container {
            display: grid;
            row-gap: 1rem;

            .date {
                font-weight: 100;
                font-size: 1.1rem;
                margin: 0;
            }

            .location-city {
                font-weight: 500;
                font-size: 1.3rem;
                margin: 0;
            }

            .location-country {
                font-weight: 500;
                font-size: 1.3rem;
                margin: 0;
            }
        }

        .weather-illustration {
            aspect-ratio: 16/9;
            object-fit: contain;
            object-position: center;
            stroke: white;
            fill: white;
            width: 200px;
            align-self: center;

            >svg {
                stroke: white;
                fill: white;
            }
        }

        .summary-container {
            display: grid;
            justify-items: center;
            text-align: center;
            align-items: center;
            row-gap: 1rem;

            .temperature {
                font-weight: 500;
                font-size: 2.5rem;
                margin: 0;
                text-shadow: 1px 1px 1px #ffffff;
            }

            .feels-like-temperature-container {
                display: flex;
                gap: 0.5rem;

                .feels-like-temperature {
                    font-weight: 500;
                    font-size: 1rem;
                    margin: 0;
                }
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
            container-name: condition-container;
            container-type: inline-size;

            .condition-container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin: 1rem;

                .condition {

                    display: flex;
                    column-gap: 1rem;
                    align-items: center;
                    border: 0.5px solid #ffffff;
                    border-radius: $radius;
                    padding: 0.75rem;
                    background-color: rgb(255, 255, 255, 0.1);

                    >svg {
                        aspect-ratio: 1;
                        object-fit: contain;
                        width: 1.5rem;
                        stroke: #ffffff;
                    }

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

}
</style>
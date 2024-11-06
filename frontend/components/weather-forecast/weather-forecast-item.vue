<template>

    <div class="forecast-item">

        <div class="summary">

            <NuxtImg class="weather-illustration" :src="iconByWeatherStatus" :alt="props?.item?.weather[0]?.description"
                :title="props?.item?.weather[0]?.description" />

            <div :style="{ display: 'flex', columnGap: '0.5rem', alignItems: 'center' }">
                <span>Day:</span>
                <time :datetime="new Date(props?.item?.dt * 1000).toDateString()">
                    {{ new Date(props?.item?.dt * 1000).getDate() }}
                </time>

            </div>
            <span>
                {{ capitalizeWord(props?.item?.weather[0]?.description) }}
            </span>

        </div>

        <div class="condition-container">
            <div class="condition">
                <span>Min:</span>
                <div class="value">
                    <span
                        :style="{ color: props?.item?.temp?.min > 18 ? 'orange' : 'rgb(100, 177, 255)', display: 'flex', columnGap: '0.25rem', fontWeight: 800 }">
                        <span>
                            {{ props?.item?.temp?.min }}
                        </span>
                        <span>ºC</span>
                    </span>

                </div>
            </div>

            <div class="condition">
                <span>Max:</span>

                <div class="value">
                    <span
                        :style="{ color: props?.item?.temp?.max > 18 ? 'orange' : 'rgb(100, 177, 255)', display: 'flex', columnGap: '0.25rem', fontWeight: 800 }">
                        <span> {{ props?.item?.temp?.max }}</span>
                        <span>ºC</span>
                    </span>

                </div>
            </div>

        </div>
    </div>


</template>

<script setup lang="ts">

const props = defineProps(['item']);

const iconByWeatherStatus = computed(() => getImageUrlByWeatherStatus(props?.item?.weather[0]?.main, true))


</script>

<style lang="scss" scoped>
@media only screen and (max-width: 736px) {
    .condition-container {
        display: flex !important;
        flex-direction: column;
    }
}

.forecast-item {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: fit-content;

    .summary {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .weather-illustration {
            aspect-ratio: 16/9;
            object-fit: contain;
            object-position: center;
            stroke: white;
            fill: white;
            min-width: 50px;
            align-self: center;

            >svg {
                stroke: white;
                fill: white;
            }
        }
    }

    .condition-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        .condition {

            display: flex;
            column-gap: 1rem;
            align-items: center;
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
                display: flex;

                .title {
                    font-weight: 600;
                }
            }
        }

    }
}
</style>
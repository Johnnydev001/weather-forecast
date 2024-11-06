<template>

    <div class="forecast-item" v-if="itemToShow">

        <div class="summary">
            <div>

                {{ new Date(itemToShow?.value?.date).getDate() }}

            </div>
            <NuxtImg class="weather-illustration" :src="iconByWeatherStatus" :alt="itemToShow?.value?.weather[0]?.description"
                :title="itemToShow?.value?.weather[0]?.description" />

            <span>
                {{ itemToShow?.value?.weather[0]?.description }}
            </span>

        </div>

        <div class="condition-container">
            <div class="condition">
                <span>Min:</span>
                <div class="value">
                    <span>
                        {{ itemToShow?.value?.main?.tempMin }}
                    </span>

                    <span>
                        ºC
                    </span>

                </div>
            </div>

            <div class="condition">
                <span>Max:</span>

                <div class="value">
                    <span>
                        {{ itemToShow?.value?.main?.tempMax }}
                    </span>
                    <span>
                        ºC
                    </span>
                </div>
            </div>

        </div>
    </div>


</template>

<script setup lang="ts">

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
const itemToShow = computed(() => props?.item)

const iconByWeatherStatus = computed( () => getImageUrlByWeatherStatus(itemToShow?.value?.weather[0]?.main, true))

watchEffect(() => {
    console.log(itemToShow?.value?.main)
})

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
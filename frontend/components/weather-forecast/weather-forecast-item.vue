<template>


    <div class="forecast-item">
        <NuxtImg class="weather-illustration" :src="iconByWeatherStatus" :alt="props?.forecast?.weather?.description"
            :title="props?.forecast?.weather?.description" />

        <div class="summary">
            <span>
                {{ props?.forecast?.weather?.description }}
            </span>

            <div class="metrics">

                <span>
                    {{ props?.forecast?.wind_speed }}
                </span>

                <span>
                    {{ props?.forecast?.humidity }}
                </span>


                <span>
                    {{ props?.forecast?.pressure }}
                </span>
            </div>

        </div>
    </div>


</template>

<script setup lang="ts">

const props = defineProps(['forecast']);
const iconByWeatherStatus = computed(() => (
    getImageUrlByWeatherStatus(props?.forecast?.main, true)
))


</script>

<style lang="scss" scoped>
.forecast-item {
    border: $border;
    padding: 1rem;
    border-radius: $radius;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .summary {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .metrics {
            display: flex;
            text-align: center;
            justify-content: center;
        }
    }
}
</style>
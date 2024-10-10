<template>
  <Hero :locationToFind="locationToFind"/>
</template>

<script setup lang="ts">
import Hero from '~/components/hero/hero.vue';

const locationToFind = ref("")
const navigator = ref(window?.navigator)

const latitude = ref(0);
const longitude = ref(0);

const handleFindLocationByCoordinates = async (latitude: number, longitude: number) => {
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

const handleSetCoordinates = () => {
    if (navigator?.value?.geolocation) {
        navigator?.value?.geolocation?.getCurrentPosition((position) => {
            if(position?.coords?.latitude && position?.coords?.longitude){
                latitude.value = position?.coords?.latitude
            }
            if(position?.coords?.longitude){
                longitude.value = position?.coords?.longitude
            }
        });
    }
}

handleSetCoordinates()
handleFindLocationByCoordinates(latitude.value, longitude.value)

</script>
<style  lang="css">
html, body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  background-color: #005183;
  color: #ffffff;
}
</style>
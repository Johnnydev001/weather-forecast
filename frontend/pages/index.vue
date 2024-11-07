<template>

  <Suspense>

    <template #default>
      <Hero :locationToFind="locationToFind" />

    </template>

    <template #fallback>
      <Overlay />
    </template>

    <template #pending>
      <Overlay/>
    </template>


  </Suspense>


</template>

<script setup lang="ts">
import Hero from '~/components/hero/hero.vue';
import Overlay from '~/components/overlay/overlay.vue';
import type { LocationAddressType } from '~/types/location/location-types';

const locationToFind = ref("")
const navigator = ref(window?.navigator)

const latitude = ref(0);
const longitude = ref(0);

const handleFindLocationByCoordinates = async (lat: number, lon: number): Promise<LocationAddressType | undefined | null> => {
  try {
    return await $fetch('/api/location', {
      method: 'POST',
      body: {
        lat: lat,
        lon: lon
      }
    })

  } catch (error) {
    console.error('Failed to get the location data from the server due to: ', error);
  }
}

const handleSetCoordinates = () => {
  if (navigator?.value?.geolocation) {
    navigator?.value?.geolocation?.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
      },
      (error) => {
        console.error("Error fetching location due to:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}
handleSetCoordinates()
watch([latitude, longitude], async ([newLatitude, newLongitude]) => {
  const locationByCoordinates = await handleFindLocationByCoordinates(newLatitude, newLongitude);
  if (locationByCoordinates) {
    locationToFind.value = locationByCoordinates?.city || locationByCoordinates?.name || "";
    navigateTo(`/${locationToFind.value}`)
  }
})

</script>
<style lang="css">
html,
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  background-color: #103d51;
  color: #ffffff;
}
</style>
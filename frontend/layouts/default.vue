<template>

  <Head>
    <Title>Weather forecast</Title>
  </Head>

  <Body>
    <header>
      <Navigation />
    </header>
    <main>

      <slot />

    </main>
    <footer>

      <Footer />
    </footer>
  </Body>
</template>

<script setup lang="ts">
import hero from '~/components/hero/hero.vue';

</script>
<style lang="css">
html,
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0
}
</style>
<template>
    <Head>
      <Title>Weather forecast</Title>
    </Head>
    <Body>
      <header class="header">
        <Navigation />
      </header>
      <main >
  
        <slot/>
  
      </main>
      <footer>
  
        <Footer/>
      </footer>
    </Body>
</template>

<style lang="scss">
.header {
  background-color: #ffffff;
}


</style>
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

<style lang="css">
html,
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;

}


@media only screen and (max-width: 580px){
  main {
    height: min-content;
  }
}
footer {
  background-color: rgb(255,255,255,0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur( 10.5px );
  -webkit-backdrop-filter: blur( 10.5px );
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  position: fixed;
  
  z-index: 1;
  justify-self: center;
  width: 100%;
  bottom: 0;
}
</style>
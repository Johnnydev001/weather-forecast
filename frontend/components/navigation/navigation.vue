<template>
  <nav>
    <ul role="navigation" class="nav-list">
      <li key="app-name">
        <NuxtLink class="app-logo-link" to="/">
          <WeatherIcon />
        </NuxtLink>

      </li>

      <li key="search-field">

        <form class="search-container" @submit="handleInputSearch">
          <input type="text" placeholder="Search..." :value="textInput" class="search-input"
            @change="handleInputChange">
          <button class="search-button">
            <SearchIcon />
          </button>
        </form>
      </li>

      <li key="social-media" class="social-media-list">
        <a class="social-media-link" href="https://x.com/JohnnySaraiva00">
          <TwitterIcon />
        </a>
        <a class="social-media-link" href="https://www.linkedin.com/in/jo%C3%A3o-saraiva-ab662b197/">
          <LinkedinIcon />
        </a>

        <a class="social-media-link" href="https://github.com/Johnnydev001">
          <GithubIcon />
        </a>

      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import GithubIcon from "~/public/assets/icons/github.vue";
import LinkedinIcon from "~/public/assets/icons/linkedin.vue";
import TwitterIcon from "~/public/assets/icons/twitter.vue";
import SearchIcon from "~/public/assets/icons/search.vue";
import { ref } from "vue"
import WeatherIcon from "~/public/assets/icons/weather.vue";

const textInput = ref("")

const handleInputChange = (event: { target: { value: string; } } | Event | null ) => {
  textInput.value = event && event?.target && 'value' in event?.target ? event?.target?.value : ''
}

const handleInputSearch = (event: HTMLFormElement | Event) => {
  event?.preventDefault();
  if (textInput?.value) {
    navigateTo(`/${textInput?.value}`)
  }
}

</script>


<style lang="scss">
nav {
  background-color: rgb(255,255,255,0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  position: fixed;
  z-index: 1;
  justify-self: center;
  width: 100%;
  padding: 0.5rem;
}

.nav-list {

  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  color: inherit;

  .app-logo-link {

    >svg {
      color: #ffffff;
      stroke: #ffffff;
      width: 2rem;
    }

    >svg:hover {
      cursor: pointer;
      transition-duration: 200ms;
      transform: scale(1.2);
      transition-timing-function: ease;
    }
  }

  .search-container {
    display: flex;
    align-items: center;
    border: $border;
    border-radius: 0.25rem;
    overflow: hidden;
    background-color: #f9f9f9;

    .search-input {
      border: none;
      padding: 10px;
      font-size: 16px;
      outline: none;
      max-width: 130px;
    }

    .search-button>svg {
      background: #ffffff;
      color: #000000;
    }

    .search-button {
      border: none;
      padding: 10px;
      cursor: pointer;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .link {
    text-decoration-color: #000000;
    text-decoration: unset;
    color: inherit;
    font-size: 13px;

    >h1 {
      font-weight: 500;
    }
  }

  .social-media-list {
    list-style: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
    padding: 0.25rem;
    border: 1px solid transparent;
    border-radius: 1rem;

    .social-media-link {
      padding: 0;
      margin: 0;

      >svg:hover {
        cursor: pointer;
        transition-duration: 100ms;
        transform: scale(1.2);
        transition-timing-function: ease-in-out;

      }
    }
  }
}
</style>
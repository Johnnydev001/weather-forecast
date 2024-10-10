<template>
  <nav>
    <ul role="list" class="nav-list">
      <li key="app-name">
        <NuxtLink class="link" to="/" >
        <h1 class="app-name">Weather forecast</h1>
        </NuxtLink>
   
      </li>

      <li key="search-field" class="search-container">

        <input type="text" placeholder="Search location..." class="search-input" @change="handleInputChange">
        <button class="search-button" @click="handleInputSearch">
          <SearchIcon/>
        </button>

      </li>

      <li key="social-media" class="social-media-list">
        <TwitterIcon />
        <LinkedinIcon />
        <GithubIcon />
      
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import GithubIcon from "~/public/assets/icons/github.vue";
import LinkedinIcon from "~/public/assets/icons/linkedin.vue";
import TwitterIcon from "~/public/assets/icons/twitter.vue";
import SearchIcon from "~/public/assets/icons/search.vue";
import {ref} from "vue"

const textInput = ref("")

const handleInputChange = (event: HTMLInputElement) => {
  event.preventDefault();
  textInput.value = event.target.value;
}

const handleInputSearch = (event: HTMLButtonElement) => {
  event.preventDefault();
  console.log(textInput.value)
}

</script>


<style lang="scss">
nav {
  background-color: #005183;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
}

.nav-list {

  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  color: inherit;

  .app-name {
    color: inherit;
  }

  .search-container{
    display: flex;
    align-items: center;
    width: 300px;
    border: 0.5px solid #000000;
    border-radius: 0.25rem;
    overflow: hidden;
    background-color: #f9f9f9;

    .search-input {
      flex: 1;
      border: none;
      padding: 10px;
      font-size: 16px;
      outline: none;

    }

    .search-button > svg{
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

    > h1{
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

    background-color: #f9f9f9;

    >svg:hover {
      stroke-width: 0.15rem;
      stroke: #cacaca;
      cursor: pointer;

    }
  }
}
</style>
<template>
  <nav>
    <ul role="navigation" class="nav-list">
      <li key="app-name">
        <NuxtLink class="link" to="/" >     <h1>Weather forecast</h1></NuxtLink>
   
      </li>

      <li key="search-field">
        <button>
          <input type="text">

          <SearchIcon />
          </input>
        </button>

      </li>

      <li key="social-media">
        <ul role="list" class="social-media-list">
          <li title="LinkedIn">
            <LinkedinIcon />
          </li>

          <li title="Github">
            <GithubIcon />
          </li>
          <li title="Twitter/X">
            <TwitterIcon />
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import GithubIcon from "~/assets/icons/github.vue";
import LinkedinIcon from "~/assets/icons/linkedin.vue";
import TwitterIcon from "~/assets/icons/twitter.vue";
import SearchIcon from "~/assets/icons/search.vue";
</script>


<style lang="scss">
.nav-list {

  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .link {
    text-decoration-color: #000000;
    text-decoration: unset;  
    color: #000000;
  }

  .social-media-list {
    list-style: inherit;
    display: flex;
    align-items: center;
    justify-content: space-around;
    column-gap: 1rem;
  }
}
</style>
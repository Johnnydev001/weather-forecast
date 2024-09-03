<template>
  <nav>
    <ul role="navigation">
      <li key="app-name">
        <h1>Weather forecast</h1>
      </li>

      <li key="search-field">
        <section></section>
      </li>

      <li key="social-media">
        <ul role="list">
          <li title="LinkedIn">
            <Linkedin />
          </li>

          <li title="Github">
            <Github />
          </li>
          <li title="Twitter/X">
            <Twitter />
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Github from "~/assets/icons/github.vue";
import Linkedin from "~/assets/icons/linkedin.vue";
import Twitter from "~/assets/icons/twitter.vue";
</script>

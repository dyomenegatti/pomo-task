<template>
  <div :class="themeClass" id="app">
    <router-view />
  </div>
</template>

<script>
import themeMixin from "@/mixins/themeMixin";

export default {
  mixins: [themeMixin],
};
</script>

<style lang="scss">
@import "@/assets/styles/_variables.scss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  font-family: $font-main;
}

#app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.light-theme {
  background: $background-light;
  color: $font-primary-light;
}

.dark-theme {
  background: $background-dark;
  color: $font-primary-dark;
}
</style>

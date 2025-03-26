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
  background: $light-bg;
  color: $light-text;
}

.dark-theme {
  background: $dark-bg;
  color: $dark-text;
}
</style>

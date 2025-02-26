<template>
  <header class="header">
    <span class="title">to<span class="title-highlight">do.</span></span>
    <button :class="themeClass" @click="handleButtonClick">
      <i v-if="lightMode" class="mdi mdi-weather-sunny"></i>
      <i v-else class="mdi mdi-weather-night"></i>
    </button>
  </header>
</template>

<script>
import { mapActions } from "vuex";
import themeMixin from "@/mixins/themeMixin";

export default {
  name: "AppHeader",
  mixins: [themeMixin],
  data() {
    return {
      lightMode: true,
    };
  },
  methods: {
    ...mapActions(["toggleTheme"]),
    handleButtonClick() {
      this.toggleTheme();
      this.lightMode = !this.lightMode;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;

  .title {
    font-size: 3rem;
    font-weight: bold;

    &-highlight {
      font-size: inherit;
      font-weight: bold;
      color: $primary;
    }
  }

  button {
    font-size: 1.5rem;
    background: transparent;
    margin: 15px;
    cursor: pointer;

    &.light-theme {
      color: $font-primary-light;
    }

    &.dark-theme {
      color: $font-primary-dark;
    }
  }
}
</style>

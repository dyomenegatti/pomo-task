<template>
  <header class="header">
    <Title
      title="to"
      second-title="do."
    ></Title>
    
    <!-- <button :class="themeClass" @click="handleButtonClick">
      <i v-if="lightMode" class="mdi mdi-weather-sunny"></i>
      <i v-else class="mdi mdi-weather-night"></i>
    </button> -->

    <Button :hasTitle="true" @click="handleButtonClick">
      <template #text>
        oi
      </template>
    </Button>

    <div class="header__actions">
      <Input placeholder="search" icon="mdi mdi-magnify" iconPosition="left" customClass="input-square" />
      <Button :hasTitle="false" @click="handleButtonClick">
        <template v-slot>
          <i v-if="lightMode" class="mdi mdi-weather-sunny"></i>
          <i v-else class="mdi mdi-weather-night"></i>
  
          <i class="mdi mdi-menu"></i>
        </template>
      </Button>
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
import themeMixin from "@/mixins/themeMixin";
import Title from "./Title.vue";
import Button from "./Button.vue";
import Input from "./Input.vue";

export default {
  name: "AppHeader",
  mixins: [themeMixin],
  components: { Title, Button, Input, },
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

  .header__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  // button {
  //   font-size: 1.5rem;
  //   background: transparent;
  //   margin: 15px;
  //   cursor: pointer;

  //   &.light-theme {
  //     color: $text-light;
  //   }

  //   &.dark-theme {
  //     color: $text-dark;
  //   }
  // }
}
</style>

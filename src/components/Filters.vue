<template>
  <div :class="[themeClass, 'filters']">
    <div class="filters__content">
      <Title subtitle="Filters"></Title>

      <div class="filters__list-container">
        <ul class="filters__list">
          <li class="filters__item">
            <Button :hasTitle="true" @click="handleInputSearch">
              <template v-slot:icon>
                <i class="filters__icon mdi mdi-magnify"></i>
              </template>
              <template v-slot:text>
                search
              </template>
            </Button>
          </li>
          <li class="filters__item">
            <Button :hasTitle="true">
              <template v-slot:icon>
                <i class="filters__icon mdi mdi-star"></i>
              </template>
              <template v-slot:text>
                favorites
              </template>
            </Button>
          </li>
          <li class="filters__item">
            <Button :hasTitle="true">
              <template v-slot:icon>
                <i class="filters__icon mdi mdi-check-circle"></i>
              </template>
              <template v-slot:text>
                complete
              </template>
            </Button>
          </li>
          <li class="filters__item">
            <Button :hasTitle="true">
              <template v-slot:icon>
                <i class="filters__icon mdi mdi-delete"></i>
              </template>
              <template v-slot:text>
                deleted
              </template>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from "@/mixins/themeMixin";
import Title from "./Title.vue";
import Button from "./Button.vue";

export default {
  name: "FiltersApp",
  mixins: [themeMixin],
  components: { Title, Button, },
  data() {
    return {
      
    }
  },
  methods: {
    handleInputSearch() {
      this.$emit('search');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.filters {
  border-radius: 10px;
  &.light-theme {
    background: $light-bg;
  }

  &.dark-theme {
    background: $dark-bg;
  }
}

.filters__content {
  padding: 20px;
  height: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filters__list-container {
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.filters__list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
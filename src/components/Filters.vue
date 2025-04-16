<template>
  <div :class="[themeClass, 'filters']">
    <div class="filters__content"  :class="themeClass">
      <Title subtitle="Filters" data-test="filter_header_title"></Title>

      <div class="filters__list-container">
        <ul class="filters__list">
          <li class="filters__item">
            <Button :hasTitle="true" @click="handleInputSearch" :hoverColor="hoverColor" data-test="filter_btn_search">
              <template v-slot:icon>
                <i class="filters__icon mdi mdi-magnify"></i>
              </template>
              <template v-slot:text>
                search
              </template>
            </Button>
          </li>
          <li class="filters__item">
            <Button :hasTitle="true" @click="toggleShowFavorites" :hoverColor="hoverColor" data-test="filter_btn_favorite">
              <template v-slot:icon>
                <i class="filters__icon mdi mdi-star"></i>
              </template>
              <template v-slot:text>
                favorites
              </template>
            </Button>
          </li>
          <li class="filters__item">
            <Button :hasTitle="true" @click="toggleShowComplete" :hoverColor="hoverColor" data-test="filter_btn_complete">
              <template v-slot:icon>
                <i class="filters__icon mdi mdi-check-circle"></i>
              </template>
              <template v-slot:text>
                complete
              </template>
            </Button>
          </li>
          <li class="filters__item">
            <div class="underline"></div>
          </li>
          <li class="filters__item">
            <Button :hasTitle="true" @click="toggleClearFilters" :hoverColor="hoverColor" data-test="filter_btn_clear">
              <template v-slot:icon>
                <i class="filters__icon mdi mdi-delete"></i>
              </template>
              <template v-slot:text>
                clear
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FiltersApp",
  mixins: [themeMixin],
  components: { Title, Button, },
  data() {
    return {
      
    }
  },
  methods: {
    ...mapActions({
      setShowFavorite: 'setShowFavorite',
      setShowCompleted: 'setShowCompleted',
      clearFilters: 'clearFilters',
    }),
    handleInputSearch() {
      this.$emit('search');
    },
    toggleShowFavorites() {
      this.setShowFavorite(this.showFavorites);
    },
    toggleShowComplete() {
      this.setShowCompleted(this.showCompleted);
    },
    toggleClearFilters() {
      this.clearFilters();
    },
  },
  computed: {
    ...mapGetters({
      showCompleted: 'showCompleted',
      showFavorites: 'showFavorites',
    }),
    hoverColor() {
      return '#7A4FFE';
    }
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
  width: 100%;

  .underline {
    width: 100%;
    height: 2px;
    background: $underline-filters;
  }
}
</style>
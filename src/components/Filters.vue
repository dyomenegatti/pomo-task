<template>
  <div :class="themeClass" class="container">
    <div class="content">
      <Title subtitle="Filters"></Title>

      <div class="filters">
        <ul class="filters-list">
          <li class="filter-btn" v-if="showInputSearch" @click="handleInputSearch">
            <Button :hasTitle="true">
              <template v-slot:icon>
                <i class="mdi mdi-magnify"></i>
              </template>
              <template v-slot:text>
                search
              </template>
            </Button>
          </li>

          <div class="filter-search" v-else @click="handleInputSearch">
            <Input placeholder="search" icon="mdi mdi-magnify" iconPosition="left" customClass="input-square" />
            <i class="mdi mdi-close"></i>
          </div>

          <li class="filter-btn">
            <Button :hasTitle="true">
              <template v-slot:icon>
                <i class="mdi mdi-star"></i>
              </template>
              <template v-slot:text>
                favorites
              </template>
            </Button>
          </li>
          <li class="filter-btn">
            <Button :hasTitle="true">
              <template v-slot:icon>
                <i class="mdi mdi-check-circle"></i>
              </template>
              <template v-slot:text>
                complete
              </template>
            </Button>
          </li>
          <li class="filter-btn">
            <Button :hasTitle="true">
              <template v-slot:icon>
                <i class="mdi mdi-delete"></i>
              </template>
              <template v-slot:text>
                deleted
              </template>
            </Button>
          </li>
        </ul>
        <div class="filters-footer">
          <div class="underline"></div>
          <span class="copyright">Dyovana Menegatti</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from "@/mixins/themeMixin";
import Title from "./Title.vue";
import Button from "./Button.vue";
import Input from "./Input.vue";

export default {
  name: "FiltersApp",
  mixins: [themeMixin],
  components: { Title, Button, Input, },
  data() {
    return {
      showInputSearch: false,
    }
  },
  methods: {
    handleInputSearch() {
      console.log('oi?')
      this.showInputSearch = false;
    },
    handleClickOutside() {
      this.showInputSearch = true;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.container {
  &.light-theme {
    background: $background-secondary-light;
    color: $color-text-light;
  }

  &.dark-theme {
    background: $background-task-dark;
    color: $text-dark;

    .filters ul .filter-btn button {
      color: $text-dark !important;
    }
    .filters .filters-footer .underline {
      background: $text-dark !important;
    }
    .filters .filters-footer .copyright {
      color: $text-dark !important;
    }
    .input-search {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border: 1px solid $text-dark;
      border-radius: 4px;
      padding: 5px 15px;
    }
    .input-search input {
      background: transparent;
    }
  }
}

.container .content {
  padding: 50px;
  height: 80vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  .filters {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .filter-search {
        display: flex;
        align-items: center;
        gap: 8px;
        .mdi {
          font-size: 0.8rem;
        }
      }
    }

    .filters-footer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      .underline {
        width: 100%;
        height: 2px;
        background: $color-text-light;
      }
      .copyright {
        color: $color-text-light;
        margin-top: 24px;
      }
    }
  }
}
</style>

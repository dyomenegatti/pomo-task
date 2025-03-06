<template>
  <div :class="themeClass" class="container">
    <div class="content">
      <span class="title">Filters</span>

      <div class="filters">
        <ul class="filters-list">
          <li class="filter-btn">
            <button>
              <i class="mdi mdi-magnify"></i>
              search
            </button>
          </li>
          <li class="filter-btn">
            <button>
              <i class="mdi mdi-star"></i>
              favorites
            </button>
          </li>
          <li class="filter-btn">
            <button>
              <i class="mdi mdi-check-circle"></i>
              complete
            </button>
          </li>
          <li class="filter-btn">
            <button>
              <i class="mdi mdi-delete"></i>
              deleted
            </button>
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

export default {
  name: "FiltersApp",
  mixins: [themeMixin],
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
  }
}

.container .content {
  padding: 50px;
  height: 80vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  .title {
    font-size: 1.8rem;
    font-weight: bold;
    color: $primary;
  }

  .filters {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    ul {
      list-style-type: none;

      .filter-btn button {
        font-size: 1.1rem;
        background: transparent;
        cursor: pointer;
        padding: 10px;
        color: $color-text-light;
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

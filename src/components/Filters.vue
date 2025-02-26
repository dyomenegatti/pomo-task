<template>
  <div class="container">
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
export default {
  name: "FiltersApp",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.container .content {
  padding: 50px;
  height: 80vh;
  border-radius: 10px;
  background: $primary-dark;
  color: $font-secondary-dark;
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
        color: $font-secondary-dark;
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
        background: $font-secondary-dark;
      }
    }
  }
}
</style>

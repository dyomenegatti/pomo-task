<template>
  <header class="header">
    <div class="header__title">
      <Title
        title="to"
        second-title="do."
        data-test="header_title"
      ></Title>
    </div>

    <div class="header__pomodoro">
      <Button :hasTitle="true" @click="handleOpenModal" data-test="header_btn_pomodoro">
        <template #text>
          <i class="mdi mdi-clock"></i>
          Pomodoro
        </template>
      </Button>
    </div>

    <div v-if="isMobile">
      <Button :hasTitle="false" @click="handleOpenModal" class="header__pomodoro-timer" data-test="header_btn_pomodoro_mobile">
        <template v-slot>
          <i class="mdi mdi-clock"></i>
        </template>
      </Button>
    </div>

    <Pomodoro 
      :showModal="showModal"
      @close="handleCloseModal"
      data-test="header_pomodoro_modal"
    />

    <div class="header__actions">
      <Input 
        v-if="showInputSearch"
        placeholder="search"
        icon="mdi mdi-magnify"
        iconPosition="left"
        customClass="input-square"
        v-model="searchKeyword"
        data-test="header_input_search"
      />
      
      <Button :hasTitle="false" @click="handleButtonClick" data-test="header_btn_toggle_theme">
        <template v-slot>
          <i v-if="lightMode" class="mdi mdi-weather-sunny"></i>
          <i v-else class="mdi mdi-weather-night"></i>
        </template>
      </Button>

      <div class="header__menu">
        <Button :hasTitle="false" @click="handleOpenDialog" data-test="header_btn_menu_dropdown">
          <template v-slot>
            <i class="mdi mdi-menu"></i>
          </template>
        </Button>
        <div v-if="showMenu" class="header__dropdown-menu" data-test="header_menu_dropdown">
          <Filters 
            @search="handleInputSearch"
            data-test="header_filters_modal"
          />
        </div>
      </div> 
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
import themeMixin from "@/mixins/themeMixin";
import Title from "./Title.vue";
import Button from "./Button.vue";
import Pomodoro from "./Pomodoro.vue";
import Input from "./Input.vue";
import Filters from "./Filters.vue";

export default {
  name: "AppHeader",
  mixins: [themeMixin],
  components: {
    Title,
    Button,
    Pomodoro,
    Input,
    Filters,
  },
  data() {
    return {
      lightMode: true,
      showMenu: false,
      showModal: false,
      showInputSearch: false,
      isMobile: window.innerWidth <= 560,
      searchKeyword: '',
    };
  },
  mounted() {
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    ...mapActions([
      "toggleTheme",
      "setSearchKeyword",
    ]),
    handleButtonClick() {
      this.toggleTheme();
      this.lightMode = !this.lightMode;
    },
    handleOpenDialog() {
      this.showMenu = !this.showMenu;
    },
    handleOpenModal() {
      this.showModal = true;
    },
    handleCloseModal() {
      this.showModal = false;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 560;
    },
    handleInputSearch() {
      this.showInputSearch = !this.showInputSearch;
    },
  },
  watch: {
    searchKeyword(newKeyword) {
      this.setSearchKeyword(newKeyword);
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
  padding: 0 20px;

  &__pomodoro {
    background: $primary;
    padding: 8px 16px;
    border-radius: 8px;

    ::v-deep button {
      color: white !important;

      :hover {
        color: white !important;
      }
    }
  }

  &__actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;

    .header__menu {
      position: relative;

      .header__dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background: $light-bg;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        z-index: 1000;
      }
    }
  }
}

@media screen and (max-width: 560px) {
  .header__pomodoro {
      display: none;
  }

  .header__pomodoro-timer {
    display: block;
    background: $primary;
    padding: 5px 10px;
    border-radius: 100%;

    ::v-deep button {
      color: none !important;
    }
  }
}
</style>

<template>
  <div :class="themeClass" class="task-item">
    <div class="task-item__content">
      <Button :hasTitle="false">
        <template v-slot>
          <i class="mdi mdi-circle-outline"></i>
        </template>
      </Button>
      <span>oisfsdfsdfdfd</span>
    </div>
    
    <div class="task-item__actions">
      <Button :hasTitle="false">
        <template v-slot>
          <i class="mdi mdi-star-outline"></i>
        </template>
      </Button>
      <Button :hasTitle="false">
        <template v-slot>
          <i class="mdi mdi-pencil"></i>
        </template>
      </Button>
      <Button :hasTitle="false">
        <template v-slot>
          <i class="mdi mdi-delete"></i>
        </template>
      </Button>
    </div>

    <div class="task-item__menu">
      <Button :hasTitle="false" @click="handleOpenMenu">
        <template v-slot>
          <i class="mdi mdi-dots-vertical"></i>
        </template>
      </Button>

      <div v-if="showMenu" class="task-item__dropdown">
        <Button :hasTitle="true">
          <template v-slot:icon>
            <i class="filters__icon mdi mdi-star-outline"></i>
          </template>
          <template v-slot:text>
            favorite
          </template>
        </Button>
        <Button :hasTitle="true">
          <template v-slot:icon>
            <i class="filters__icon mdi mdi-pencil"></i>
          </template>
          <template v-slot:text>
            edit
          </template>
        </Button>
        <Button :hasTitle="true">
          <template v-slot:icon>
            <i class="filters__icon mdi mdi-delete"></i>
          </template>
          <template v-slot:text>
            delete
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from "@/mixins/themeMixin";
import Button from "./Button.vue";

export default {
  name: "TaskItem",
  mixins: [themeMixin],
  components: { Button, },
  data() {
    return {
      showMenu: false,
    }
  },
  methods: {
    handleOpenMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.task-item {
  width: 100%;
  height: auto;
  padding: 6px 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &.light-theme {
    background: $light-bg-item;
    color: $light-text;
  }

  &.dark-theme {
    background: $dark-bg-item;
    color: $dark-text;
  }

  i {
    font-size: 1.3rem;
    cursor: pointer;
  }

  &__content {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;

    .mdi-circle-outline {
      font-size: 1.7rem;
    }
  }

  &__actions {
    display: flex;
    gap: 8px;

    button {
      background: transparent;
    }
  }

  &__menu {
    display: none;
  }
}

@media screen and (max-width: 560px) {
  .task-item__actions {
    display: none;
  }

  .task-item__menu {
    display: flex;
    position: relative;

    .task-item__dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: $light-bg;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      z-index: 1000;
      width: 150px;
      padding: 10px;
    }
  }
}
</style>

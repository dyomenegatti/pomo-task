<template>
  <div :class="themeClass" class="item-container">
    <div class="task-content">
      <i class="mdi mdi-circle-outline"></i>
      <span>oisfsdfsdfdfd</span>
    </div>
    <div class="task-actions">
      <button><i class="mdi mdi-star-outline"></i></button>
      <button><i class="mdi mdi-pencil"></i></button>
      <button><i class="mdi mdi-delete"></i></button>
    </div>
  </div>
</template>

<script>
import themeMixin from "@/mixins/themeMixin";

export default {
  name: "TaskItem",
  mixins: [themeMixin],
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.item-container {
  &.light-theme {
    background: $background-task-light;
    color: $color-text-light;

    i {
      color: $color-text-light;
    }

    .task-actions button {
      color: $color-text-light;
    }
  }

  &.dark-theme {
    background: $background-secondary-dark;
    color: $text-dark;

    i {
      color: $text-dark;
    }

    .task-actions button {
      color: $text-dark;
    }
  }

  width: 100%;
  height: auto;
  padding: 6px 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  i {
    font-size: 1.3rem;
    cursor: pointer;
  }

  .task-content {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;

    .mdi-circle-outline {
      font-size: 1.7rem;
    }
  }

  .task-actions {
    display: flex;
    gap: 8px;

    button {
      background: transparent;
    }
  }
}
</style>

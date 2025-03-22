<template>
  <div :class="themeClass" class="item-container">
    <div class="task-content">
      <Button :hasTitle="false">
        <template v-slot>
          <i class="mdi mdi-circle-outline"></i>
        </template>
      </Button>
      <span>oisfsdfsdfdfd</span>
    </div>
    <div class="task-actions">
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
  </div>
</template>

<script>
import themeMixin from "@/mixins/themeMixin";
import Button from "./Button.vue";

export default {
  name: "TaskItem",
  mixins: [themeMixin],
  components: { Button, },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.item-container {
  &.light-theme {
    background: $background-task-light;
    color: $color-text-light;
  }

  &.dark-theme {
    background: $background-secondary-dark;
    color: $text-dark;
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

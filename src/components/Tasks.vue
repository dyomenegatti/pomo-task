<template>
  <div :class="themeClass" class="tasks-container">
    <div class="content">
      <span class="title">Tasks</span>

      <div class="tasks">
        <div class="new-task">
          <input type="text" placeholder="new task" ref="newTaskInput" />
          <i class="mdi mdi-plus"></i>
        </div>
        <TaskItem />
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from "@/mixins/themeMixin";
import TaskItem from "./TaskItem.vue";

export default {
  name: "TasksApp",
  mixins: [themeMixin],
  components: {
    TaskItem,
  },
  methods: {
    focusInput() {
      this.$refs.newTaskInput.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.tasks-container {
  &.light-theme {
    background: $background-secondary-light;
    color: $color-text-light;
  }

  &.dark-theme {
    background: $background-task-dark;
    color: $text-dark;
  }
}

.tasks-container .content {
  width: 55vw;
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

  .tasks {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    .new-task {
      border: $color-text 2px solid;
      border-radius: 20px;
      padding: 6px 16px;
      input {
        background: transparent;
        color: $color-text;
      }
      .mdi-plus {
        color: $color-text;
      }
    }
  }
}
</style>

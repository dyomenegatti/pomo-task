<template>
  <div :class="themeClass" class="tasks-container">
    <div class="content">
      <Title subtitle="Tasks"></Title>

      <div class="tasks">
        <Input placeholder="new task" icon="mdi mdi-plus" iconPosition="right" customClass="input-rounded" />

        <TaskItem />
      </div>
      <div class="filters-footer">
          <div class="underline"></div>
          <span class="copyright">Dyovana Menegatti</span>
        </div>
    </div>
  </div>
</template>

<script>
import themeMixin from "@/mixins/themeMixin";
import TaskItem from "./TaskItem.vue";
import Title from "./Title.vue";
import Input from "./Input.vue";

export default {
  name: "TasksApp",
  mixins: [themeMixin],
  components: {
    TaskItem,
    Title,
    Input,
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
  width: 80vw;
  height: 80vh;
  padding: 50px;
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

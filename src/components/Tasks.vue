<template>
  <div :class="themeClass" class="tasks">
    <div class="tasks__content">
      <Title subtitle="Tasks"></Title>

      <div class="tasks__list">
        <div class="tasks__item">
          <Input placeholder="new task" icon="mdi mdi-plus" iconPosition="right" customClass="input-rounded" />
  
          <TaskItem />
        </div>
      </div>

      <div class="tasks__footer">
          <div class="tasks__underline"></div>
          <span class="tasks__copyright">Dyovana Menegatti</span>
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

.tasks {
  &.light-theme {
    background: $light-bg-list;
  }

  &.dark-theme {
    background: $dark-bg-list;
  }

  &__content {
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
  }

  &__list {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .tasks__item {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: center;
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .tasks__underline {
      width: 100%;
      height: 2px;
      background: $light-text-secondary;
    }

    .tasks__copyright {
      color: $light-text-secondary;
      margin-top: 24px;
    }
  }
}
</style>

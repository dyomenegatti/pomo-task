<template>
  <div :class="themeClass" class="tasks">
    <div class="tasks__content">
      <Title subtitle="Tasks"></Title>

      <div class="tasks__list">
        <div class="tasks__item">
          <div class="tasks__new-task">
            <Input v-model="task" placeholder="new task" customClass="input-rounded"/>
            <Button :hasTitle="false" @click="handleNewTask" class="tasks__new-task-btn">
              <template v-slot>
                <i class="mdi mdi-plus"></i>
              </template>
            </Button>
          </div>

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
import { mapActions } from "vuex";
import TaskItem from "./TaskItem.vue";
import Title from "./Title.vue";
import Input from "./Input.vue";
import Button from "./Button.vue";

export default {
  name: "TasksApp",
  mixins: [themeMixin],
  components: {
    TaskItem,
    Title,
    Input,
    Button,
  },
  data() {
    return {
      task: '',
    }
  },
  methods: {
    ...mapActions({
      toggleAddTask: 'toggleAddTask',
      listTasks: 'listTasks',
    }),
    focusInput() {
      this.$refs.newTaskInput.focus();
    },
    handleNewTask() {
      if(this.task.trim() !== '') {
        this.toggleAddTask({ name: this.task, favorite: false, checked: false, });
        this.task = '';
      }
    },
  },
  mounted() {
    this.listTasks();
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

      .tasks__new-task {
        display: flex;
        gap: 8px;

        .tasks__new-task-btn {
          display: block;
          background: $primary;
          padding: 2px 8px;
          border-radius: 100%;

          ::v-deep button {
            color: white !important;

            :hover {
              color: white !important;
            }
          }
        }
      }
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

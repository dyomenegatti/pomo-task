<template>
  <div class="task-item" v-if="showTaskItem" data-test="task_item_container">
    <div class="task-item__container" :class="themeClass" v-for="item in todos" :key="item.id" data-test="task_item_list">
      <div class="task-item__content" data-test="task_item">
        <Button :hasTitle="false" @click="checkedTask(item.id)" data-test="task_item_btn_check">
          <template v-slot>
            <i :class="item.checked ? 'mdi mdi-checkbox-marked-circle' : 'mdi mdi-circle-outline'" data-test="task_item_icon_checked"></i>
          </template>
        </Button>
        <span v-if="editingTaskId !== item.id" :class="{ 'task-item__content-checked': item.checked }" data-test="task_item_name_task">{{ item.name }}</span>
        <Input 
          v-else 
          type="text" 
          customClass="input-underline" 
          v-model="editedTaskName" 
          data-test="task_item_input_new_task"
        />
      </div>
      <div class="task-item__actions" data-test="task_item_actions">
        <Button :hasTitle="false" @click="favoriteTask(item.id)" data-test="task_item_btn_favorite">
          <template v-slot>
            <i :class="item.favorite ? 'mdi mdi-star' : 'mdi mdi-star-outline'" data-test="task_item_icon_favorite"></i>
          </template>
        </Button>
        <Button :hasTitle="false" @click="editTask(item.id)" data-test="task_item_btn_edit">
          <template v-slot>
            <i :class="editingTaskId === item.id ? 'mdi mdi-check' : 'mdi mdi-pencil'" data-test="task_item_icon_edited"></i>
          </template>
        </Button>
        <Button :hasTitle="false" @click="removeTask(item.id)" data-test="task_item_btn_delete">
          <template v-slot>
            <i class="mdi mdi-delete" data-test="task_item_icon_deleted"></i>
          </template>
        </Button>
      </div>

      <div class="task-item__menu" data-test="task_item_menu_mobile">
        <Button :hasTitle="false" @click="handleOpenMenu(item.id)" data-test="task_item_btn_menu">
          <template v-slot>
            <i class="mdi mdi-dots-vertical"></i>
          </template>
        </Button>
  
        <div v-if="activeMenuId === item.id" :class="themeClass" class="task-item__dropdown" data-test="task_item_menu_dropdown">
          <Button :hasTitle="true" @click="favoriteTask(item.id)" :hoverColor="'#7A4FFE'" data-test="task_item_btn_favorite_menu">
            <template v-slot:icon>
              <i :class="item.favorite ? 'mdi mdi-star' : 'mdi mdi-star-outline'"></i>
            </template>
            <template v-slot:text>
              favorite
            </template>
          </Button>
          <Button :hasTitle="true" @click="editTask(item.id)" :hoverColor="'#7A4FFE'" data-test="task_item_btn_edit_menu">
            <template v-slot:icon>
              <i class="filters__icon mdi mdi-pencil"></i>
            </template>
            <template v-slot:text>
              edit
            </template>
          </Button>
          <Button :hasTitle="true" @click="removeTask(item.id)" :hoverColor="'#7A4FFE'" data-test="task_item_btn_delete_menu">
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import themeMixin from "@/mixins/themeMixin";
import Button from "./Button.vue";
import Input from "./Input.vue";

export default {
  name: "TaskItem",
  mixins: [themeMixin],
  components: { Button, Input, },
  data() {
    return {
      activeMenuId: null,
      editingTaskId: null,
      editedTaskName: '',
    }
  },
  mounted() {
    this.listTasks();
  },
  methods: {
    ...mapActions({
      listTasks: 'listTasks',
      toggleRemoveTask: 'toggleRemoveTask',
      toggleEditTask: 'toggleEditTask',
      setFavorite: 'setFavorite', 
      setCheck: 'setCheck', 
    }),
    handleOpenMenu(taskId) {
      this.activeMenuId = this.activeMenuId === taskId ? null : taskId;
    },
    removeTask(taskId) {
      this.toggleRemoveTask(taskId);
    },
    editTask(taskId) {
      if (this.editingTaskId === taskId) {
        this.toggleEditTask({ id: taskId, name: this.editedTaskName });
        this.editingTaskId = null;
        this.editedTaskName = "";
      } else {
        const task = this.todos.find(task => task.id === taskId);
        this.editingTaskId = taskId;
        this.editedTaskName = task.name;
      }
    },
    favoriteTask(taskId) {
      this.setFavorite({ id: taskId });
    },
    checkedTask(taskId) {
      this.setCheck({ id: taskId });
    },
  },
  computed: {
    ...mapGetters({
      todos: 'filteredTodos',
    }),
    showTaskItem() {
      return this.todos.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.task-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  .task-item__container {
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
  
    .task-item__content {
      display: flex;
      gap: 8px;
      justify-content: center;
      align-items: center;

      .task-item__content-checked {
        text-decoration: line-through;
      }
  
      .mdi {
        font-size: 1.7rem;
      }
    }
  
    .task-item__actions {
      display: flex;
      gap: 8px;
  
      button {
        background: transparent;
      }
    }
  
    .task-item__menu {
      display: none;
    }
  }
}

@media screen and (max-width: 560px) {
  .task-item__container {
    .task-item__actions {
      display: none !important;
    }
  
    .task-item__menu {
      display: block !important;
      position: relative;
  
      .task-item__dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        z-index: 1000;
        width: 150px;
        padding: 10px;
      }
    }
  }
}
</style>

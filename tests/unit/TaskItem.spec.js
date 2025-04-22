import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex';
import TaskItem from "@/components/TaskItem.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let getters;
let actions;
let wrapper;

const ButtonStub = {
  template: '<button @click="$emit(\'click\')"><slot /></button>',
};

const mountTaskItem = (overrides = {}) => {
  return shallowMount(TaskItem, {
    localVue, 
    store, 
    stubs: { Button: ButtonStub },
    ...overrides,
  });
};

const criarStoreComGetters = (customGetters) => {
  store = new Vuex.Store({
    getters: {
      ...getters,
      ...customGetters,
    },
    actions,
  });
  wrapper = mountTaskItem();
};

describe('TaskItem.vue', () => {
  beforeEach(() => {
    getters = {
      currentTheme: () => "light",
      filteredTodos: () => [
        { id: 1, name: 'Task 1', checked: false, favorite: false },
      ],
    };

    actions = {
      listTasks: jest.fn(),
      toggleRemoveTask: jest.fn(),
      toggleEditTask: jest.fn(),
      setFavorite: jest.fn(),
      setCheck: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });

    wrapper = mountTaskItem();
  });

  describe("Renderização", () => {
    it("Renderiza o container da tarefa", () => {
      const tasks = wrapper.find('[data-test="task_item_container"]');
      expect(tasks.exists()).toBe(true);
    });

    it("Renderiza a lista de tarefas", () => {
      const taskList = wrapper.find('[data-test="task_item_list"]');
      expect(taskList.exists()).toBe(true);
    });

    it("Renderiza a tarefa", () => {
      const taskItem = wrapper.find('[data-test="task_item"]');
      expect(taskItem.exists()).toBe(true);
    });

    it("Renderiza o botão de completar a tarefa", () => {
      const btnCheckTask = wrapper.find('[data-test="task_item_btn_check"]');
      expect(btnCheckTask.exists()).toBe(true);
    });

    it("Renderiza o ícone de tarefa marcada", () => {
      const iconCheckTask = wrapper.find('[data-test="task_item_icon_checked"]');
      expect(iconCheckTask.exists()).toBe(true);
    });

    it("Renderiza o título da tarefa", () => {
      const titleTask = wrapper.find('[data-test="task_item_name_task"]');
      expect(titleTask.exists()).toBe(true);
    });

    it("Renderiza campo para editar a tarefa", () => {
      const customWrapper = mountTaskItem({
        data() {
          return {
            editingTaskId: 1,
            editedTaskName: "Task 1",
          }
        }
      });
      const inputEditTask = customWrapper.find('[data-test="task_item_input_new_task"]');
      expect(inputEditTask.exists()).toBe(true);
    });

    it("Renderiza menu de ações da tarefa", () => {
      const menuActions = wrapper.find('[data-test="task_item_actions"]');
      expect(menuActions.exists()).toBe(true);
    });

    it("Renderiza o botão de favoritar a tarefa", () => {
      const btnFavoriteTask = wrapper.find('[data-test="task_item_btn_favorite"]');
      expect(btnFavoriteTask.exists()).toBe(true);
    });

    it("Renderiza icone de tarefa favoritada", () => {
      const iconFavoriteTask = wrapper.find('[data-test="task_item_icon_favorite"]');
      expect(iconFavoriteTask.exists()).toBe(true);
    });

    it("Renderiza o botão de editar a tarefa",() => {
      const btnEditTask = wrapper.find('[data-test="task_item_btn_edit"]');
      expect(btnEditTask.exists()).toBe(true);
    });

    it("Renderiza icone de editar a tarefa", () => {
      const iconEditTasm = wrapper.find('[data-test="task_item_icon_edited"]');
      expect(iconEditTasm.exists()).toBe(true);
    });

    it("Renderiza o botão de deletar a tarefa", () => {
      const btnDeleteTask = wrapper.find('[data-test="task_item_btn_delete"]');
      expect(btnDeleteTask.exists()).toBe(true);
    });

    it("Renderiza icone de deletar a tarefa", () => {
      const iconDeleteTask = wrapper.find('[data-test="task_item_icon_deleted"]');
      expect(iconDeleteTask.exists()).toBe(true);
    });

    it("Renderiza a exibição do menu de ações quando Mobile", () => {
      const menuActionsMobile = wrapper.find('[data-test="task_item_menu_mobile"]');
      expect(menuActionsMobile.exists()).toBe(true);
    });

    it("Renderiza icone do menu de ações no mobile", () => {
      const iconMenuActionsMobile = wrapper.find('[data-test="task_item_btn_menu"]');
      expect(iconMenuActionsMobile.exists()).toBe(true);
    });

    it("Renderiza menu de ações no mobile", () => {
      const customWrapper = mountTaskItem({
        data() {
          return {
            activeMenuId: 1,
          }
        }
      });
      const menuDropdownActionsMobile = customWrapper.find('[data-test="task_item_menu_dropdown"]');
      expect(menuDropdownActionsMobile.exists()).toBe(true);
    });

    it("Renderiza o botão de favoritar a tarefa no mobile", () => {
      const customWrapper = mountTaskItem({
        data() {
          return {
            activeMenuId: 1,
          }
        }
      });
      const btnFavoriteTaskMobile = customWrapper.find('[data-test="task_item_btn_favorite_menu"]');
      expect(btnFavoriteTaskMobile.exists()).toBe(true);
    });

    it("Renderiza o botão de editar a tarefa no mobile", () => {
      const customWrapper = mountTaskItem({
        data() {
          return {
            activeMenuId: 1,
          }
        }
      });
      const btnEditTaskMobile = customWrapper.find('[data-test="task_item_btn_edit_menu"]');
      expect(btnEditTaskMobile.exists()).toBe(true);
    });

    it("Renderiza o botão de deletar a tarefa no mobile", () => {
      const customWrapper = mountTaskItem({
        data() {
          return {
            activeMenuId: 1,
          }
        }
      });
      const btnDeleteTaskMobile = customWrapper.find('[data-test="task_item_btn_delete_menu"]');
      expect(btnDeleteTaskMobile.exists()).toBe(true);
    });
  });

  describe("Ações", () => {
    it('Dispara a action "setCheck" ao clicar no botão de completar tarefa', async () => {
      const btnCheck = wrapper.find('[data-test="task_item_btn_check"]');
      await btnCheck.trigger('click');

      expect(actions.setCheck).toHaveBeenCalled();
      expect(actions.setCheck.mock.calls[0][1]).toEqual({ id: 1 });
    });

    it('Alterna o ícone da tarefa ao clicar no botão de completar', async () => {
      criarStoreComGetters({
        filteredTodos: () => [
          { id: 1, name: 'Task 1', checked: false, favorite: false },
        ]
      });
    
      let iconCheck = wrapper.find('[data-test="task_item_icon_checked"]');
      expect(iconCheck.classes()).toContain('mdi');
      expect(iconCheck.classes()).toContain('mdi-circle-outline');
      expect(iconCheck.classes()).not.toContain('mdi-checkbox-marked-circle');
    
      const btnCheck = wrapper.find('[data-test="task_item_btn_check"]');
      await btnCheck.trigger('click');
    
      criarStoreComGetters({
        filteredTodos: () => [
          { id: 1, name: 'Task 1', checked: true, favorite: false },
        ]
      });
    
      iconCheck = wrapper.find('[data-test="task_item_icon_checked"]');
      expect(iconCheck.classes()).toContain('mdi');
      expect(iconCheck.classes()).toContain('mdi-checkbox-marked-circle');
      expect(iconCheck.classes()).not.toContain('mdi-circle-outline');
    });
  });

  it('Alterna o ícone de favorito ao clicar no botão', async () => {
    criarStoreComGetters({
      filteredTodos: () => [
        { id: 1, name: 'Task 1', checked: false, favorite: false },
      ]
    });

    let iconFavorite = wrapper.find('[data-test="task_item_icon_favorite"]');
    expect(iconFavorite.classes()).toContain('mdi');
    expect(iconFavorite.classes()).toContain('mdi-star-outline');
    expect(iconFavorite.classes()).not.toContain('mdi-star');

    const btnFavorite = wrapper.find('[data-test="task_item_btn_favorite"]');
    await btnFavorite.trigger('click');

    criarStoreComGetters({
      filteredTodos: () => [
        { id: 1, name: 'Task 1', checked: false, favorite: true },
      ]
    });

    iconFavorite = wrapper.find('[data-test="task_item_icon_favorite"]');
    expect(iconFavorite.classes()).toContain('mdi');
    expect(iconFavorite.classes()).toContain('mdi-star');
    expect(iconFavorite.classes()).not.toContain('mdi-star-outline');
  });

  it('Edita uma tarefa ao clicar no botão', async () => {
    const btnEdit = wrapper.find('[data-test="task_item_btn_edit"]');
    await btnEdit.trigger('click');

    const customWrapper = mountTaskItem({
      data() {
        return {
          editingTaskId: 1,
          editedTaskName: "Task 1 Editada",
        }
      }
    });
    const inputEdit = customWrapper.find('[data-test="task_item_input_new_task"]');
    expect(inputEdit.exists()).toBe(true);

    const iconEdit = customWrapper.find('[data-test="task_item_icon_edited"]');
    expect(iconEdit.classes()).toContain('mdi');
    expect(iconEdit.classes()).toContain('mdi-check');
    expect(iconEdit.classes()).not.toContain('mdi-pencil');

    const btnSave = customWrapper.find('[data-test="task_item_btn_edit"]');
    await btnSave.trigger('click');

    expect(actions.toggleEditTask).toHaveBeenCalled();
    expect(actions.toggleEditTask.mock.calls[0][1]).toEqual({
      id: 1,
      name: 'Task 1 Editada',
    });

    wrapper = mountTaskItem();
    const spanName = wrapper.find('[data-test="task_item_name_task"]');
    expect(spanName.exists()).toBe(true);

    const iconReset = wrapper.find('[data-test="task_item_icon_edited"]');
    expect(iconReset.classes()).toContain('mdi');
    expect(iconReset.classes()).toContain('mdi-pencil');
  });

  it('Deleta uma tarefa ao clicar no botão', async () => {
    criarStoreComGetters({
      filteredTodos: () => [
        { id: 1, name: 'Task 1', checked: false, favorite: false },
      ]
    });
  
    const btnDelete = wrapper.find('[data-test="task_item_btn_delete"]');
    await btnDelete.trigger('click');
  
    expect(actions.toggleRemoveTask).toHaveBeenCalled();
    expect(actions.toggleRemoveTask.mock.calls[0][1]).toBe(1);
  });
});
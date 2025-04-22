import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex';
import Tasks from "@/components/Tasks.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let getters;
let actions;
let wrapper;

const ButtonStub = {
  template: '<button @click="$emit(\'click\')"><slot /></button>',
};

const mountTasks = (overrides = {}) => {
  return shallowMount(Tasks, {
    localVue, 
    store, 
    stubs: { Button: ButtonStub },
    ...overrides,
  })
};

describe('Tasks.vue', () => {
  beforeEach(() => {
    getters = {
      currentTheme: () => "light",
    };

    actions = {
      listTasks: jest.fn(),
      toggleAddTask: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });

    wrapper = mountTasks();
  });

  describe('Renderização', () => {
    it('Renderiza o container tasks', () => {
      const tasks = wrapper.find('[data-test="tasks_container"]');
      expect(tasks.exists()).toBe(true);
    });

    it('Renderiza título do componente', () => {
      const title = wrapper.find('[data-test="tasks_title"]');
      expect(title.exists()).toBe(true);
    });

    it('Renderiza campo para adicionar nova tarefa', () => {
      const input = wrapper.find('[data-test="tasks_input_new_task"]');
      expect(input.exists()).toBe(true);
    });

    it('Renderiza botão para adicionar nova tarefa', () => {
      const btnNewTask = wrapper.find('[data-test="tasks_btn_new_task"]');
      expect(btnNewTask.exists()).toBe(true);
    });

    it('Renderiza componente listagem de tarefas', () => {
      const listTasks = wrapper.find('[data-test="tasks_itens_list"]');
      expect(listTasks.exists()).toBe(true);
    });

    it('Renderiza rodapé', () => {
      const footer = wrapper.find('[data-test="tasks_footer"]');
      expect(footer.exists()).toBe(true);
    });

    it('Renderiza copyright no rodapé', () => {
      const copyright = wrapper.find('[data-test="tasks_copyright"]');
      expect(copyright.exists()).toBe(true);
    });

    it('Renderiza o texto no cpyright', () => {
      const copyrightText = wrapper.find('[data-test="tasks_copyright"]');
      expect(copyrightText.text()).toContain('Dyovana Menegatti');
    });
  });

  describe('Ações', () => {
    it('Dispara listTasks no mounted', () => {
      expect(actions.listTasks).toHaveBeenCalled();
    });

    it('Adiciona nova tarefa', async () => {
      const inputNewTask = wrapper.find('[data-test="tasks_input_new_task"]');
      await inputNewTask.vm.$emit('input', 'Estudar Vue');
      
      const btnNewTask = wrapper.find('[data-test="tasks_btn_new_task"]');
      await btnNewTask.trigger('click');
      
      expect(actions.toggleAddTask).toHaveBeenCalled();
      expect(actions.toggleAddTask.mock.calls[0][1]).toEqual({
        name: 'Estudar Vue',
        favorite: false,
        checked: false,
      });
      
      expect(wrapper.vm.task).toBe('');
    });
  });
});
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex';
import Filters from "@/components/Filters.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const ButtonStub = {
  template: '<button @click="$emit(\'click\')"><slot /></button>',
};

let getters;
let store;

const mountFilters = (overrides = {}) => {
  return shallowMount(Filters, {
    localVue,
    store,
    stubs: { Button: ButtonStub },
    ...overrides,
  });
};

describe('Filters.vue', () => {
  beforeEach(() => {
    getters = {
      showCompleted: () => false,
      showFavorites: () => true,
      currentTheme: () => "light",
    };

    store = new Vuex.Store({
      getters,
    });
  });

  describe("Renderização", () => {
    it('Renderiza título', () => {
      const wrapper = mountFilters();
      const title = wrapper.find('[data-test="filter_header_title"]');
      expect(title.exists()).toBe(true);
    });
  
    it("Renderiza o botão de pesquisa de tarefas", () => {
      const wrapper = mountFilters();
      const btnSearch = wrapper.find('[data-test="filter_btn_search"]');
      expect(btnSearch.exists()).toBe(true);
    });
  
    it("Renderiza o botão de tarefas favoritas", () => {
      const wrapper = mountFilters();
      const btnFavorite = wrapper.find('[data-test="filter_btn_favorite"]');
      expect(btnFavorite.exists()).toBe(true);
    });
  
    it("Renderiza o botão de tarefas completas", () => {
      const wrapper = mountFilters();
      const btnComplete = wrapper.find('[data-test="filter_btn_complete"]');
      expect(btnComplete.exists()).toBe(true);
    });
  
    it("Renderiza o botão de limpar filtros", () => {
      const wrapper = mountFilters();
      const btnClearFilters = wrapper.find('[data-test="filter_btn_clear"]');
      expect(btnClearFilters.exists()).toBe(true);
    });
  });

  describe("Eventos e Interações", () => {
    it("Emite o evento de busca ao clicar no botão", async () => {
      const wrapper = mountFilters();
      await wrapper.find('[data-test="filter_btn_search"]').trigger("click");
      expect(wrapper.emitted().search).toBeTruthy();
    });

    it("Emite o evento de filtrar as tarefas favoritas ao clicar no botão", async () => {
      const mockSetShowFavorite = jest.fn();

      store = new Vuex.Store({
        getters,
        actions: {
          setShowFavorite: mockSetShowFavorite,
        }
      });

      const wrapper = mountFilters();
      await wrapper.find('[data-test="filter_btn_favorite"]').trigger('click');
      expect(mockSetShowFavorite).toHaveBeenCalled();
    });

    it("Emite o evento de filtrar as tarefas concluídas ao clicar no botão", async () => {
      const mockSetShowCompleted = jest.fn();

      store = new Vuex.Store({
        getters,
        actions: {
          setShowCompleted: mockSetShowCompleted,
        }
      });

      const wrapper = mountFilters();
      await wrapper.find('[data-test="filter_btn_complete"]').trigger('click');
      expect(mockSetShowCompleted).toHaveBeenCalled();
    });

    it("Emite o evento de limpar os filtros ao clicar no botão", async () => {
      const mockSetClearFilters = jest.fn();

      store = new Vuex.Store({
        getters,
        actions: {
          clearFilters: mockSetClearFilters,
        }
      });

      const wrapper = mountFilters();
      await wrapper.find('[data-test="filter_btn_clear"]').trigger('click');
      expect(mockSetClearFilters).toHaveBeenCalled();
    });
  });
})
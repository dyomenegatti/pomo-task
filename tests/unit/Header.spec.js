import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

const ButtonStub = {
  template: '<button @click="$emit(\'click\')"><slot /></button>',
};

describe('Header.vue', () => {
  it('Renderiza título', () => {
    const wrapper = shallowMount(Header);

    const title = wrapper.find('[data-test="header_title"]');
    expect(title.props('title')).toBe('to');
    expect(title.props('secondTitle')).toBe('do.');
  })

  it('Renderiza o Pomodoro Component', async () => {
    const wrapper = shallowMount(Header, {
      data() {
        return {
          isMobile: false,
        }
      },
      stubs: {
        Button: ButtonStub,
      }
    });

    const btnPomodoro = wrapper.find('[data-test="header_btn_pomodoro"]');
    expect(btnPomodoro.exists()).toBe(true);

    await btnPomodoro.trigger("click");

    expect(wrapper.vm.showModal).toBe(true);
    const modal = wrapper.find('[data-test="header_pomodoro_modal"]');
    expect(modal.exists()).toBe(true);
    expect(modal.props("showModal")).toBe(true);
  })

  it('Renderiza light/dark mode', () => {
    const wrapper = shallowMount(Header);

    const toggleTheme = wrapper.find('[data-test="header_btn_toggle_theme"]');
    expect(toggleTheme.exists()).toBe(true);
  })

  it('Renderiza menu dropdown', async () => {
    const wrapper = shallowMount(Header, {
      data() {
        return {
          showMenu: false
        }
      },
      stubs: {
        Button: ButtonStub,
      }
    });

    const btnMenu = wrapper.find('[data-test="header_btn_menu_dropdown"]');
    expect(btnMenu.exists()).toBe(true);
  
    await btnMenu.trigger("click");
  
    expect(wrapper.vm.showMenu).toBe(true);
  
    const menu = wrapper.find('[data-test="header_menu_dropdown"]');
    expect(menu.exists()).toBe(true);
  })
})
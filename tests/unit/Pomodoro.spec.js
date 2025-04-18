import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex';
import Pomodoro from "@/components/Pomodoro.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let getters;

const ButtonStub = {
  template: '<button @click="$emit(\'click\')"><slot /></button>',
};

const mountPomodoro = (overrides = {}) => {
  return shallowMount(Pomodoro, {
    localVue,
    store,
    propsData: {
      showModal: true,
    },
    data() {
      return {
        isConfig: false,
        showPlayBtn: true,
        showStopBtn: false,
        showPauseBtn: false,
        showConfigBtn: true,
        timeLeft: 1500,
      }
    },
    stubs: { Button: ButtonStub },
    ...overrides,
  })
};

describe('Pomodoro.vue', () => {
  beforeEach(() => {
    getters = {
      currentTheme: () => "light",
    };

    store = new Vuex.Store({
      getters,
    });
  })
  describe('Renderiza elementos da interface', () => {
    it('Renderiza modal Pomodoro', () => {
      const wrapper = mountPomodoro();

      const modal = wrapper.find('[data-test="pomodoro_modal"]');
      expect(modal.exists()).toBe(true);
    });

    it('Renderiza botão fechar modal', () => {
      const wrapper = mountPomodoro({
        propsData: {
          showModal: false,
        }
      });

      const closeModal = wrapper.find('[data-test="pomodoro_btn_close"]');
      expect(closeModal.exists()).toBe(false);
    });

    it('Renderiza timer pomodoro', () => {
      const wrapper = mountPomodoro();

      const timerPomodoro = wrapper.find('[data-test="pomodoro_btn_timer"]');
      expect(timerPomodoro.exists()).toBe(true);
    });

    it('Renderiza input pomodo', () => {
      const wrapper = mountPomodoro({
        data() {
          return {
            isConfig: true,
          }
        }
      });

      const inputPomodoro = wrapper.find('[data-test="pomodoro_input_timer"]');
      expect(inputPomodoro.exists()).toBe(true);
    });

    it('Renderiza botão play timer Pomodoro', () => {
      const wrapper = mountPomodoro();

      const btnStart = wrapper.find('[data-test="pomodoro_btn_start_timer"]');
      expect(btnStart.exists()).toBe(true);
    });

    it('Renderiza botão pausa timer Pomodoro', () => {
      const wrapper = mountPomodoro({
        data() {
          return {
            showPauseBtn: true,
          }
        }
      });

      const btnPause = wrapper.find('[data-test="pomodoro_btn_pause_timer"]');
      expect(btnPause.exists()).toBe(true);
    });

    it('Renderiza botão parar timer Pomodoro', () => {
      const wrapper = mountPomodoro({
        data() {
          return {
            showStopBtn: true,
          }
        }
      });

      const btnStop = wrapper.find('[data-test="pomodoro_btn_stop_timer"]');
      expect(btnStop.exists()).toBe(true);
    });

    it('Renderiza botão configura timer Pomodoro', () => {
      const wrapper = mountPomodoro();

      const btnConfig = wrapper.find('[data-test="pomodoro_btn_config_timer"]');
      expect(btnConfig.exists()).toBe(true);
    });

    it('Renderiza botão confirmar novo timer Pomdoro', () => {
      const wrapper = mountPomodoro({
        data() {
          return {
            isConfig: true,
          }
        }
      });

      const btnConfirmNewTimer = wrapper.find('[data-test="pomodoro_btn_confirm_timer"]');
      expect(btnConfirmNewTimer.exists()).toBe(true);
    });
  });

  describe('Evento na modal', () => {
    it('Emite o fechamento da modal', async () => {
      const wrapper = mountPomodoro();
      
      await wrapper.find('[data-test="pomodoro_btn_close"]').trigger('click');
      expect(wrapper.emitted().close).toBeTruthy();
    });
  });

  describe('Interações no timer Pomodoro', () => {
    it('Inicia o timer ao clicar no botão play', () => {
      const wrapper = mountPomodoro();

      const btnPlay = wrapper.find('[data-test="pomodoro_btn_start_timer"]');
      btnPlay.trigger('click');

      expect(wrapper.vm.showPlayBtn).toBe(false);
      expect(wrapper.vm.showStopBtn).toBe(true);
      expect(wrapper.vm.showPauseBtn).toBe(true);

      expect(wrapper.vm.isRunning).toBe(true);
    });

    it('Pausa o timer ao clicar no botão de pause', () => {
      const wrapper = mountPomodoro({
        data() {
          return {
            showPlayBtn: false,
            showStopBtn: true,
            showPauseBtn: true,
            timeLeft: 1200, 
            isRunning: true, 
          };
        }
      });

      const btnPause = wrapper.find('[data-test="pomodoro_btn_pause_timer"]');
      btnPause.trigger('click');

      expect(wrapper.vm.showPlayBtn).toBe(true);
      expect(wrapper.vm.showStopBtn).toBe(true);
      expect(wrapper.vm.showPauseBtn).toBe(false);

      expect(wrapper.vm.isRunning).toBe(false);
    });

    it('Parar o timer ao clicar no botão de stop', () => {
      const wrapper = mountPomodoro({
        data() {
          return {
            showPlayBtn: false,
            showStopBtn: true,
            showPauseBtn: false,
            timeLeft: 1200, 
            isRunning: true, 
          };
        }
      });

      const stopButton = wrapper.find('[data-test="pomodoro_btn_stop_timer"]');
      stopButton.trigger('click');
    
      expect(wrapper.vm.showPlayBtn).toBe(true);
      expect(wrapper.vm.showStopBtn).toBe(false);
      expect(wrapper.vm.showPauseBtn).toBe(false);
    
      expect(wrapper.vm.isRunning).toBe(false);
      expect(wrapper.vm.timeLeft).toBe(1500);
    });

    it('Configura um novo timer ao clicar no botão de configuração', () => {
      const wrapper = mountPomodoro({
        data() {
          return {
            isConfig: true, 
            newTime: '30:00', 
            timeLeft: 1500, 
          };
        }
      });
    
      const confirmButton = wrapper.find('[data-test="pomodoro_btn_confirm_timer"]');
      confirmButton.trigger('click');
    
      expect(wrapper.vm.timeLeft).toBe(1800); 
      expect(wrapper.vm.isConfig).toBe(false);
    });

    it('Decrementa o tempo com o timer rodando', () => {
      jest.useFakeTimers();
      const wrapper = mountPomodoro();

      wrapper.find('[data-test="pomodoro_btn_start_timer"]').trigger('click');

      jest.advanceTimersByTime(3000);

      expect(wrapper.vm.timeLeft).toBe(1497);
      jest.useRealTimers();
    });

    it('Formata o tempo corretamente', () => {
      const wrapper = mountPomodoro({
        data() {
          return {
            timeLeft: 65
          }
        }
      });

      expect(wrapper.vm.formattedTime).toBe('01:05');
    });
  });
});
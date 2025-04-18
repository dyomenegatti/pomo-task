<template>
  <div class="modal-pomodoro__overlay" v-if="showModal" data-test="pomodoro_modal">
    <div class="modal-pomodoro__content" :class="themeClass" data-test="pomodoro_content">
      <div class="modal-pomodoro__close" @click="handleCloseModal" data-test="pomodoro_btn_close">
        <i class="mdi mdi-close"></i>
      </div>

      <div class="modal-pomodoro__timer">
        <span v-if="!isConfig" class="timer" data-test="pomodoro_btn_timer">{{ formattedTime }}</span>

        <div v-else class="input">
          <Input 
            type="timer" 
            customClass="input-underline" 
            v-model="newTime" 
            placeholder="MM:SS"
            data-test="pomodoro_input_timer"
          />
        </div>

        <div class="actions">
          <Button :hasTitle="false" @click="handleStartTimer" v-if="showPlayBtn" data-test="pomodoro_btn_start_timer">
            <template v-slot>
              <i class="mdi mdi-play"></i>
            </template>
          </Button>
          <Button :hasTitle="false" @click="handlePauseTimer" v-if="showPauseBtn" data-test="pomodoro_btn_pause_timer">
            <template v-slot>
              <i class="mdi mdi-pause"></i>
            </template>
          </Button>
          <Button :hasTitle="false" @click="handleResetTimer" v-if="showStopBtn" data-test="pomodoro_btn_stop_timer">
            <template v-slot>
              <i class="mdi mdi-stop"></i>
            </template>
          </Button>
          <Button :hasTitle="false" @click="handleOpenConfig" v-if="showConfigBtn" data-test="pomodoro_btn_config_timer">
            <template v-slot>
              <i class="mdi mdi-tools"></i>
            </template>
          </Button>
          <Button :hasTitle="false" @click="applyNewTime" v-if="isConfig" data-test="pomodoro_btn_confirm_timer">
            <template v-slot>
              <i class="mdi mdi-check"></i>
            </template>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from "@/mixins/themeMixin";
import Button from "./Button.vue";
import Input from "./Input.vue";

export default {
  name: 'ModalPomodoro',
  mixins: [themeMixin],
  components: { Button, Input },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timer: null,
      timeLeft: 1500,
      isRunning: false,
      isConfig: false,
      newTime: '',
      showPlayBtn: true,
      showStopBtn: false,
      showPauseBtn: false,
      showConfigBtn: true,
    }
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },
  },
  methods: {
    handleCloseModal() {
      this.$emit('close');
    },
    handleStartTimer() {
      this.showPlayBtn = false;
      this.showStopBtn = true;
      this.showPauseBtn = true;
      this.showConfigBtn = false;

      if(!this.isRunning) {
        this.isRunning = true;
        this.timer = setInterval(() => {
          if(this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            this.handleResetTimer();
          }
        }, 1000);
      }
    },
    handlePauseTimer() {
      this.showPlayBtn = true;
      this.showStopBtn = true;
      this.showPauseBtn = false;
      this.showConfigBtn = true;

      this.isRunning = false;
      clearInterval(this.timer);
    },
    handleResetTimer() {
      this.showPlayBtn = true;
      this.showStopBtn = false;
      this.showPauseBtn = false;
      this.showConfigBtn = true;

      this.isRunning = false;
      clearInterval(this.timer);
      this.timeLeft = 1500;
    },
    handleOpenConfig() {
      this.isConfig = true;
    },
    applyNewTime() {
      const [minutes, seconds] = this.newTime.split(':').map(Number);
      this.timeLeft = (minutes * 60) + (seconds || 0);
      this.isConfig = false;
    },
  },
  beforeDestroy() {
    this.handlePauseTimer();
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.light-theme {
  background: $light-bg-pomodoro;
  color: $light-text;
}

.dark-theme {
  background: $dark-bg-pomodoro;
  color: $dark-text;
}

.modal-pomodoro__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-pomodoro__content {
  padding: 20px;
  border-radius: 8px;
  width: 40%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .modal-pomodoro__close {
    display: flex;
    align-self: flex-end;
    font-size: 1.6rem;

    .mdi {
      cursor: pointer;
    }
  }

  .modal-pomodoro__timer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    align-items: center;
    height: 100%;
    margin-bottom: 15px;

    .input {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40%;

      ::v-deep input {
        font-size: 3.0rem;
      }
    }
    
    span {
      font-size: 4.0rem;
      font-weight: bold;
    }

    .actions {
      display: flex;
      gap: 8px;

      ::v-deep button {
        font-size: 2.2rem;
      }

      .mdi {
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 740px) {
  .modal-pomodoro__content {
    width: 70%;
    height: 70%;
  }
}
</style>
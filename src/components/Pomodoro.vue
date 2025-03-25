<template>
  <div class="modal-pomodoro__overlay" v-if="showModal">
    <div class="modal-pomodoro__content" :class="themeClass">
      <div class="modal-pomodoro__close" @click="handleCloseModal">
        <i class="mdi mdi-close"></i>
      </div>

      <div class="modal-pomodoro__timer">
        <span class="timer">25:00</span>

        <div class="actions">
          <i class="mdi mdi-play"></i>
          <i class="mdi mdi-stop"></i>
          <i class="mdi mdi-pause"></i>
          <i class="mdi mdi-tools"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import themeMixin from "@/mixins/themeMixin";

export default {
  name: 'ModalPomodoro',
  mixins: [themeMixin],
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleCloseModal() {
      this.$emit('close');
    },
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
    align-items: center;
    height: 100%;
    margin-bottom: 15px;

    span {
      font-size: 4.0rem;
      font-weight: bold;
    }

    .actions {
      display: flex;
      gap: 8px;
      font-size: 2.2rem;

      .mdi {
        cursor: pointer;
      }
    }
  }
}

</style>
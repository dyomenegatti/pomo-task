<template>
  <div :class="['input-container', customClass]">
    <label v-if="label" :for="inputId">{{ label }}</label>
    <div class="input-wrapper">
      <i v-if="icon && iconPosition === 'left'" :class="['input-icon', icon]"></i>
      <input
        :id="inputId"
        :type="type"
        v-model="inputValue"
        :placeholder="placeholder"
        @input="validateInput"
      />
      <i v-if="icon && iconPosition === 'right'" :class="['input-icon', icon]"></i>
    </div>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: 'InputApp',
  props: {
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: value => ['left', 'right'].includes(value)
    },
    type: {
      type: String,
      default: 'text'
    },
    customClass: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      inputValue: this.value,
      errorMessage: ''
    };
  },
  computed: {
    inputId() {
      return `input-${this._uid}`;
    },
  },
  watch: {
    value(newValue) {
      this.inputValue = newValue;
    },
    inputValue(newValue) {
      this.$emit('input', newValue);
    }
  },
  methods: {
    validateInput() {
      const regex = /^([0-5]?[0-9]):([0-5]?[0-9])$/;
      if (!regex.test(this.inputValue)) {
        this.errorMessage = 'Invalid format. Use MM:SS';
      } else {
        this.errorMessage = '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.input-container {
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  display: flex;
  align-items: center;
}

.input-icon {
  margin: 0 0.5rem;
}

.input-rounded {
  border: $light-text-secondary 2px solid;
  border-radius: 20px;
  padding: 6px 16px;
}

.input-square {
  border: $light-text-secondary 2px solid;
  border-radius: 4px;
  padding: 2px 10px;
}

.input-underline {
  border: none;
  border-bottom: 1px solid #000;
}

input {
  border: none;
  outline: none;
  background: transparent;
  color: $light-text-secondary;
  width: 100%;
}

.error-message {
  color: red;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .input-container {
    width: 100%;
  }
}
</style>
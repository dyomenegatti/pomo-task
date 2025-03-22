<template>
    <div :class="['input-container', customClass]">
        <label v-if="label" :for="inputId">{{ label }}</label>
        <div class="input-wrapper">
            <i v-if="icon && iconPosition === 'left'" :class="['input-icon', icon]"></i>
            <input :id="inputId" :type="type" :v-model="value" :placeholder="placeholder"/>
            <i v-if="icon && iconPosition === 'right'" :class="['input-icon', icon]"></i>
        </div>
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
    computed: {
        inputId() {
            return `input-${this._uid}`;
        },
    },
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
    border: $color-text 2px solid;
    border-radius: 20px;
    padding: 6px 16px;
}

.input-square {
    border: $color-text 2px solid;
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
    color: $color-text;
    width: 100%;
}
</style>
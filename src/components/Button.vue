<template>
    <div :class="themeClass" class="button">
        <button v-if="!hasTitle" class="button__primary" @click="$emit('click')">
            <slot></slot>
        </button>

        <button v-else class="button__title" @click="$emit('click')">
            <slot name="icon"></slot>
            <span class="button__title-text">
                <slot name="text"></slot>
            </span>
        </button>
    </div>
</template>

<script>
import themeMixin from "@/mixins/themeMixin";

export default {
    name: 'ButtonApp',
    mixins: [themeMixin],
    props: {
        hasTitle: {
            type: Boolean,
            default: false
        },
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.button {
    display: flex;
    align-items: center;
    background: transparent;

    .button__primary {
        font-size: 1.5rem;
        background: transparent;
        cursor: pointer;
    }

    .button__title {
        font-size: 1.1rem;
        cursor: pointer;
        color: $color-text-light;
        
        &:hover {
            color: $primary;

            .button__title-text,
            ::v-deep i {
                color: $primary;
            }
        }
    }

    .button__title-text {
        margin-left: 8px;
    }

    &.light-theme {
        .button__primary,
        .button__title {
            color: $color-text-light;
        }
    }

    &.dark-theme {
        .button__primary,
        .button__title {
            color: $text-dark;
            background: transparent;
        }
    }
}
</style>

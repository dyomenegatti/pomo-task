<template>
    <div class="title">
        <div class="title__main" v-if="title">
            <span class="title__main-text">{{ title }}<span class="title__main-highlight">{{ secondTitle }}</span></span>
        </div>

        <div class="title__secondary" v-else>
            <span class="title__secondary-text">{{ subtitle }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TitleApp',
    props: {
        title: {
            type: String,
            required: false
        },
        secondTitle: {
            type: String,
            default: ''
        },
        subtitle: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.title {
    &__main {
        &-text {
            font-size: 3rem;
            font-weight: bold;

            .title__main-highlight {
                font-size: inherit;
                font-weight: bold;
                color: $primary !important;
            }
        }
    }

    &__secondary {
        &-text {
            font-size: 1.8rem;
            font-weight: bold;
            color: $primary;
        }
    }
}
</style>


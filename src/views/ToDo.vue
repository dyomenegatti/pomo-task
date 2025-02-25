<template>
  <div :class="themeClass" class="home">
    <Header></Header>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import themeMixin from "@/mixins/themeMixin";

export default {
  name: "ToDo",
  components: {
    Header,
  },
  mixins: [themeMixin],
};
</script>

<style lang="scss">
@import "@/assets/styles/_variables.scss";

.home {
  width: 80vw;
}
</style>

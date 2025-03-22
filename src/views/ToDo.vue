<template>
  <div :class="themeClass" class="container">
    <Header></Header>

    <div class="content">
      <!-- <Filters></Filters> -->
      <Tasks></Tasks>
    </div>
  </div>
</template>

<script>
import themeMixin from "@/mixins/themeMixin";
import Header from "@/components/Header.vue";
import Tasks from "@/components/Tasks.vue";

export default {
  name: "ToDo",
  components: {
    Header,
    Tasks,
  },
  mixins: [themeMixin],
};
</script>

<style lang="scss">
@import "@/assets/styles/_variables.scss";

.container {
  // max-width: 100vw;
  // min-height: 100vh;

  .content {
    display: flex;
    gap: 20px;
  }
}
</style>

<template>
  <div class="container">
    <div class="task-content">
      <i class="mdi mdi-circle-outline"></i>
      <span>oisfsdfsdfdfd</span>
    </div>
    <div class="task-actions">
      <button><i class="mdi mdi-star-outline"></i></button>
      <button><i class="mdi mdi-pencil"></i></button>
      <button><i class="mdi mdi-delete"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.container {
  width: 100%;
  height: auto;
  color: $font-primary-dark;
  background: $font-primary-light;
  padding: 6px 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  i {
    font-size: 1.3rem;
    cursor: pointer;
  }

  .task-content {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }

  .task-actions {
    display: flex;
    gap: 8px;

    button {
      background: transparent;
      color: $font-primary-dark;
    }
  }
}
</style>

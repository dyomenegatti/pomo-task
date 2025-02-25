import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["currentTheme"]),
    themeClass() {
      return this.currentTheme === "light" ? "light-theme" : "dark-theme";
    },
  },
};

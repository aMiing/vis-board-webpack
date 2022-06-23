import { mapActions, mapMutations, mapGetters } from "vuex";
import localforage from "localforage";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("editor", { screen: "screenData", elements: "getElements" }),
  },
  async mounted() {},
  methods: {
    ...mapMutations("history", ["startRecordHistory"]),
    ...mapMutations("editor", ["updateId", "useElements", "useScreen"]),
    async fetchData(id) {
      const data = await localforage.getItem(id);
      const { screen = {}, elements = [] } = data || {};
      this.useScreen(screen);
      this.useElements(elements);
    },
  },
};

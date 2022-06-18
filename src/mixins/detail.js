import { mapActions, mapMutations, mapGetters } from "vuex";
import localforage from "localforage";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("panel", { screen: "screenData", elements: "getElements" }),
  },
  async mounted() {
    // 更新id
    const id = this.$route?.query?.id;
    this.updateId(id);
    await this.fetchData(id);
    this.startRecordHistory();
  },
  methods: {
    ...mapMutations("history", ["startRecordHistory"]),
    ...mapMutations("panel", ["updateId", "useElements", "useScreen"]),
    async fetchData(id) {
      const data = await localforage.getItem(id);
      if (data) {
        const { screen = {}, elements = [] } = data;
        this.useScreen(screen);
        this.useElements(elements);
      }
    },
  },
};

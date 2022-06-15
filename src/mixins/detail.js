import { mapActions, mapMutations, mapGetters } from "vuex";
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
    await this.fetchScreenData();
    await this.fetchElements();
    this.startRecordHistory();
  },
  methods: {
    ...mapMutations("history", ["startRecordHistory"]),
    ...mapMutations("panel", ["updateId"]),
    ...mapActions("panel", ["useScreen", "fetchScreenData", "fetchElements"]),
  },
};

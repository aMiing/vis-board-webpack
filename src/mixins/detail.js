import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      panels: [],
    };
  },
  computed: {
    id() {
      return this.$route?.query?.id;
    },
    screen() {
      const target = this.panels.find(e => e.id === this.id);
      this.updateData(target);
      return target;
    },
  },
  created() {
    this.getPanelList();
  },
  mounted() {
    this.recordView();
  },
  methods: {
    ...mapMutations("panel", ["setData"]),
    updateData(data) {
      // const panelListStr = JSON.stringify(this.panels);
      // //   存储或更新localstorage
      // window.sessionStorage.setItem("panelListStr", panelListStr);
      this.setData(data);
    },
    getPanelList() {
      //   获取panelList
      const list = window.sessionStorage.getItem("panelListStr") || "[]";
      this.panels = JSON.parse(list);
    },
    recordView() {
      console.log("this.screen", this.screen);
      this.screen.viewCount++;
      this.updateData({ id: this.id, viewCount: this.screen.viewCount });
    },
  },
};

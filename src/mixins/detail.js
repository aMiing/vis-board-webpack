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
      return this.panels.find(e => e.id === this.id);
    },
  },
  created() {
    this.getPanelList();
  },
  mounted() {
    this.recordView();
  },
  methods: {
    updateData() {
      const panelListStr = JSON.stringify(this.panels);
      //   存储或更新localstorage
      window.sessionStorage.setItem("panelListStr", panelListStr);
    },
    getPanelList() {
      //   获取panelList
      const list = window.sessionStorage.getItem("panelListStr") || "[]";
      this.panels = JSON.parse(list);
    },
    recordView() {
      console.log("this.screen", this.screen);
      this.screen.viewCount++;
      this.updateData();
    },
  },
};

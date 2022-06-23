import { mapGetters, mapActions, mapMutations } from "vuex";
const operations = {
  data() {
    return {
      btnList: [
        {
          name: "保存",
          iconClass: "iconfont icon-baocun",
          click: () => this.save(),
          disabled: () => this.noNeedBeSave,
          reason: "无变更需要保存",
        },
        {
          name: "上一步",
          iconClass: "iconfont icon-houtui-shi",
          click: () => this.undo(),
          disabled: () => !this.canUndo,
          reason: "没有上一步了~",
        },
        {
          name: "下一步",
          iconClass: "iconfont icon-qianjin-shi",
          click: () => this.redo(),
          disabled: () => !this.canRedo,
          reason: "已经是最后一步了",
        },
        {
          name: "发布",
          iconClass: "iconfont icon-fabu",
          click: row => this.$refs["publish-dialog"].show(row),
        },
        {
          name: "预览",
          iconClass: "iconfont icon-yulan",
          click: row => this.preview(),
        },
      ],
    };
  },
  computed: {
    ...mapGetters("history", ["isFirstHistory", "noNeedBeSave", "canRedo", "canUndo"]),

    id() {
      return this.$route?.query?.id;
    },
  },
  methods: {
    ...mapActions("editor", ["saveData"]),
    ...mapActions("history", { undo: "undo", redo: "redo" }),

    async save() {
      await this.saveData();
      this.$message.success("保存成功！");
    },
    preview() {
      this.$router.push({
        name: "preview",
        query: {
          id: this.id,
        },
      });
    },
  },
};

export default operations;

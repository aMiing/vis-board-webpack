import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("panel", ["screenData"]),
  },
  methods: {},
};

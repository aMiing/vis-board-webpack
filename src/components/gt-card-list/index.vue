<template>
  <ul class="gt-card-list">
    <li
      v-for="card in cardList"
      :key="card.id || card.templateId"
      class="item-container"
      :class="getStatus(card)"
    >
      <div class="item-container_header">
        <div class="card-item-row">
          <ellipsis-tooltip>
            <span slot="text">
              <span class="card-item-row-name ofellipsis">{{ card.title }}</span>
            </span>
          </ellipsis-tooltip>

          <div v-if="showState" class="card-item-row-status">
            <span class="dot"></span>
            {{ (statusList.find(item => item.value === card.state) || {}).text }}
          </div>
        </div>
        <div class="card-item-row mt-8">
          <ellipsis-tooltip>
            <span slot="text">
              <span class="card-item-row-normal ofellipsis">创建者:{{ card.creator }}</span>
            </span>
          </ellipsis-tooltip>
          <div class="card-item-row-normal">{{ card.updateTime | filterTime }}</div>
        </div>
        <slot name="operator" :card="card"></slot>
      </div>
      <div class="item-container_preview">
        <slot name="preview" :card="card"></slot>
        <slot name="mode_operation" :card="card"></slot>
      </div>
    </li>
    <li
      v-for="(item, idx) in rowMaxNum"
      :key="idx + 'placeholder'"
      class="item-container item-placeolder"
    ></li>
  </ul>
</template>
<script>
import * as config from "@/config/listOptions";
import EllipsisTooltip from "@/components/ellipsis-tooltip/";
import GImage from "./image";
import dayjs from "dayjs";
export default {
  name: "GtCardList",
  filters: {
    filterTime(time) {
      return time ? dayjs(time).format("YYYY-MM-DD HH:mm:ss") : "--";
    },
  },
  components: { EllipsisTooltip, GImage },
  props: {
    cardList: {
      type: Array,
      default: () => [],
    },
    showState: {
      type: Boolean,
      default: false,
    },
    rowMaxNum: {
      type: Number,
      default: 0,
    },
    getStatus: {
      type: Function,
      default: () => card =>
        card.state === NOTONLINE.value
          ? "--danger"
          : card.state === ONLINE.value
          ? "--success"
          : "--normal",
    },
  },
  data() {
    return {
      config,
      // srcPre: window.location.origin,
      imagesMap: {},
    };
  },
  computed: {
    statusList() {
      // 过滤掉已删除、上线拒绝、下线拒绝的状态
      return this.config.modelStatusList.filter(
        item => ![config.REMOVED.value].includes(item.value)
      );
    },
  },
  watch: {
    "$microShareInfo.theme": {
      handler: function (val) {
        if (!val) return;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    equalProps(newV, oldV, props) {
      if (!newV || !oldV || newV.length !== oldV.length) return false;
      return !newV.some((e, i) => JSON.stringify(e[props]) !== JSON.stringify(oldV[i][props]));
    },
    // initImagesMap(clearCache = true) {
    //   // 暂时不缓存，因为不在当前页渲染有问题
    //   if (clearCache) this.imagesMap = {};
    //   let flowInstance = null;
    //   this.cardList.forEach((i, index) => {
    //     if (i.operators?.length && !this.imagesMap[i.id || i.templateId]) {
    //       creatImagesFlow(i.operators, flowInstance).then(({ flowImage, instance }) => {
    //         this.$set(this.imagesMap, i.id || i.templateId, flowImage);
    //         flowInstance = instance;
    //         if (index === this.cardList.length - 1) {
    //           flowInstance.destroy();
    //         }
    //       });
    //     }
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.gt-card-list {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  align-content: flex-start;
  overflow: auto;

  .item-container {
    flex: 0 0 256px;
    margin-right: 16px;
    margin-bottom: 16px;
    box-sizing: border-box;
    &:hover {
      .modal_operation__modal {
        opacity: 0.9;
        transition: all 0.3s;
      }
    }

    &_header {
      // height: 112px;
      padding: 8px 16px;
      background: var(--grey-4);
    }
    &_preview {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border: 2px solid var(--grey-4);
      border-top: none;
      height: 112px;
      padding: 4px;
      // .preview-img {
      //   ::v-deep .el-image__inner {
      //     max-width: 100%;
      //     max-height: 100%;
      //     image-rendering: -moz-crisp-edges; /* Firefox */
      //     image-rendering: -o-crisp-edges; /* Opera */
      //     image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
      //     image-rendering: crisp-edges;
      //     -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
      //   }
      // }
      .preview-img-deafult {
        width: 66px;
        height: 66px;
      }
      .preview-img + .preview-label {
        display: none;
      }
      .preview-img-deafult + .preview-label {
        color: var(--grey-10);
        font-size: 12px;
      }
    }
    .item-container_preview {
      position: relative;
    }
  }
  .model-item-row {
    height: 21px;
    line-height: 21px;
    .assets-info-name_btn {
      margin-left: 7px;
      font-size: 16px;
      vertical-align: middle;
      margin: 0;
      .assets-info-name_btn_item {
        display: inline-block;
        margin: 0 0 0 4px;
        span {
          margin-left: 4px;
          font-size: 14px;
        }
      }
      .iconhuo {
        color: var(--red-6);
      }
      .iconshoucang,
      .iconzan {
        color: var(--yellow-6);
      }
      .iconshoucang,
      .iconshoucang-weidianji,
      .iconzan,
      .iconzan-weidianji {
        cursor: pointer;
      }
    }
  }
  .card-item-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    &-name {
      font-weight: bold;
      font-size: 14px;
      flex: 1;
      color: var(--grey-12);
    }
    &-status {
      color: var(--grey-11);
    }
    &-normal {
      color: var(--grey-10);
    }
    // .dot {
    //   display: inline-block;
    //   width: 6px;
    //   height: 6px;
    //   border-radius: 50%;
    //   vertical-align: middle;
    // }
  }
  .item-placeolder {
    height: 0;
    border: none;
    padding: 0;
    margin-bottom: 0;
  }
  .--normal {
    // border-top: 2px solid rgba(75, 102, 133, 0.5);
    border-top: 2px solid var(--grey-10);

    .card-item-row-status .dot {
      background: var(--grey-10);
    }
  }
  .--danger {
    // border-top: 2px solid var(--red-6);
    border-top: 2px solid var(--orange-6);

    .card-item-row-status .dot {
      background: var(--grey-10);
    }
  }
  .--success {
    border-top: 2px solid var(--green-6);

    // .card-item-row-status .dot {
    //   background: var(--green-6);
    // }
  }
  .iconfont_model {
    font-size: 20px;
    cursor: pointer;
  }
  .ofellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .name-tooltip {
    max-width: 200px;
  }
  ::v-deep .el-card__header {
    padding: 16px 16px 0;
  }
  ::v-deep .el-card__body {
    padding: 4px 16px 16px;
  }
  .develop-state-success {
    color: var(--green-6);
  }
  .develop-state-default {
    color: var(--grey-10);
  }
  .card-item-row-name {
    color: var(--grey-12);
  }
}
::v-deep {
  .el-image__inner {
    max-width: 100%;
    max-height: 100%;
    image-rendering: -moz-crisp-edges; /* Firefox */
    image-rendering: -o-crisp-edges; /* Opera */
    image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
  }
}
[theme="light"] .item-container {
  // box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: var(--shadow-3);
    transition: box-shadow 0.3s ease;
  }
}
</style>

<template>
  <div
    class="screenPannel"
    style="width: 100%; height: 100%"
    :style="{ backgroundColor: screenSet.bgcolor }"
    v-loading="loadTime"
    element-loading-text="Hard loading......"
    element-loading-spinner=""
    element-loading-background="rgba(0, 0, 0, 1)"
  >
    <div id="pageBox"></div>
    <!-- 增加一个大框，阻止鼠标的事件触发 -->
    <div v-for="item in pageComponents" :key="item.id">
      <template :is="item.name" :item="item" @loadSetting="loadSetting" @changeSize="changeSize" @changePosition="changePosition" @deleate="deleate"></template>
    </div>
  </div>
</template>

<script>
import CommonTitle from "@/components/widgets/CommonTitle";
import linesText from "@/components/widgets/linesText";
import Time from "@/components/widgets/Time";
import scrollText from "@/components/widgets/scrollText";
import scrollCards from "@/components/widgets/scrollCards";
import lineChart from "@/components/widgets/lineChart";
import radarChart from "@/components/widgets/radarChart";
import barChart from "@/components/widgets/barChart";
import horizontalBarChart from "@/components/widgets/horizontalBarChart";
import pieChart from "@/components/widgets/pieChart";
import ringChart from "@/components/widgets/ringChart";
import pointChart from "@/components/widgets/pointChart";
import mapChart from "@/components/widgets/mapChart";
import dashbord from "@/components/widgets/dashbord";
import seriesDashbord from "@/components/widgets/seriesDashbord";
import borderWidget from "@/components/widgets/border";
import iconFont from "@/components/widgets/iconFont";
export default {
  name: "Preview",
  components: {
    CommonTitle,
    linesText,
    Time,
    scrollText,
    scrollCards,
    lineChart,
    radarChart,
    barChart,
    horizontalBarChart,
    pieChart,
    ringChart,
    pointChart,
    mapChart,
    dashbord,
    seriesDashbord,
    borderWidget,
    iconFont,
  },
  data() {
    return {
      loadTime: true,
      pageComponents: [],
      screenSet: "",
    };
  },
  created() {
    this.loadTime = false;

    /*从服务器加载组件数据*/

    var url = window.location.href.replace("8080/#", "8888");
    console.log(url);
    this.$http.get(url).then(function (res) {
      res.bodyText = res.bodyText.split(";");
      let BindWidget = JSON.parse(res.bodyText[0]);
      let screensetting = JSON.parse(res.bodyText[1]);
      this.screenSet = screensetting[0];
      // console.log(this.screenSet);
      for (var i = 0; i < BindWidget.length; i++) {
        // console.log(BindWidget[i].styleJson);
        let json = JSON.parse(BindWidget[i].styleJson);
        json["id"] = BindWidget[i].id;
        json["uid"] = BindWidget[i].uid;
        json["dataJson"] = BindWidget[i].dataJson;
        json["layer"] = BindWidget[i].layer;
        this.pageComponents.push(json);
      }
      // console.log(this.pageComponents);
    });
  },
};
</script>
<style scoped lang="scss">
#pageBox {
  width: 100%;
  height: 100%;
  z-index: 999;
  position: absolute;
  -moz-user-select: none; /*支持Firefox浏览器*/
  -webkit-user-select: none; /*支持Chrome，Opera，Safari等浏览器*/
  -ms-user-select: none; /*支持IE浏览器*/
  user-select: none;
}
.titleText {
  text-decoration: none;
  color: #fff;
}
.leftComponentList {
  width: 95%;
  overflow: hidden;
  padding: 0 5% 0 0;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
</style>

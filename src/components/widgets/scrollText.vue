<template>
  <div
    class="scrollText"
    :style="{
      fontWeight: data.fontWeight,
      fontFamily: data.fontFamily,
      fontSize: data.fontSize,
      color: data.color,
      width: data.width + 'px',
      height: data.height + 'px',
      backgroundColor: data.bgcolor,
    }"
  >
    <marquee :width="data.width" :behavior="data.behavior" :direction="data.direction" :scrollamount="data.scrollamount" :bgcolor="data.bgcolor">
      {{ data.text }}
    </marquee>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      Position: "absolute",
      Cursor: "move",
      Overflow: "hidden",
    };
  },
  created: function () {
    setInterval(this.showMarquee, 2000);
  },
  mounted: function () {},

  methods: {
    MoveIt: function (e) {
      console.log(this.item.uid);
      var i = parseInt(this.item.uid.slice(4));
      let oDrag = this.$el; //获取操作目标对象
      this.$emit("loadSetting", i); //i-1从id转换成index下标

      //console.log(this);
      //去除其他元素的边框
      var allDrags = document.getElementsByClassName("drag");
      for (let m = 0; m < allDrags.length; m++) {
        allDrags[m].style.border = "0";
        //console.log(allDrags[m].style);
      }
      /*获取所有的 .btn 并且设置为隐藏状态*/
      var allBtns = document.getElementsByClassName("btn");
      for (var j = 0; j < allBtns.length; j++) {
        //console.log('iii');
        allBtns[j].style.visibility = "hidden";
      }
      //console.log('ccc');
      /*获取当前的 .btn 并且设置为显示状态*/
      var theBtns = oDrag.getElementsByClassName("btn");
      for (var j = 0; j < theBtns.length; j++) {
        theBtns[j].style.visibility = "visible";
        this.$el.style.border = "0.1px solid #6bf";
      }
      //切换属性设置面板
      let pageSetting = this.$parent.$el.childNodes[8].getElementsByClassName("pageSetting")[0];

      let widgetSetting = this.$parent.$el.childNodes[8].getElementsByClassName("widgetSetting")[0];
      //console.log(widgetSetting);
      pageSetting.style.display = "none";
      widgetSetting.style.display = "block";

      var offsetParent = oDrag.parentNode; //获取父元素
      var parentOffsetWidth = offsetParent.offsetWidth; //获取父元素的宽度
      var parentOffsetLeft = offsetParent.offsetLeft; //获取父元素的左边距
      var parentOffsetTop = offsetParent.offsetTop; //获取父元素的上边距

      let disx = e.pageX - oDrag.offsetLeft;
      let disy = e.pageY - oDrag.offsetTop;
      var self = this;
      document.onmousemove = function (e) {
        //调整控件位置，并转化成百分比的形式
        oDrag.style.left = (100 * (e.pageX - disx)) / parentOffsetWidth + "%";
        oDrag.style.top = (100 * (e.pageY - disy)) / (parentOffsetWidth * 0.6) + "%";
        let leftNum = (100 * (e.pageX - disx)) / parentOffsetWidth;
        let topNum = (100 * (e.pageY - disy)) / (parentOffsetWidth * 0.6);

        self.$emit("changePosition", {
          uid: self.item.uid,
          left: leftNum,
          top: topNum,
        });
      };
      document.onmouseup = function (e) {
        document.onmousemove = document.onmouseup = null;
        /*self.$emit('saveChange',{uid:self.uid,save:true});这里没必要对数据库操作，对面不进行*/
      };
    },
    resizeIt: function (e) {
      let oDrag = this.$el;
      //阻止事件冒泡
      e.stopPropagation();
      let disx = oDrag.offsetLeft;
      let disy = oDrag.offsetTop;

      var self = this;
      var offsetParent = oDrag.parentNode; //获取父元素
      var parentOffsetWidth = offsetParent.offsetWidth; //获取父元素的宽度
      var parentOffsetHeight = offsetParent.offsetHeight; //获取父元素的宽度
      document.onmousemove = function (e) {
        oDrag.style.width = (100 * (e.pageX - disx - 190)) / parentOffsetWidth + "%";
        oDrag.style.height = (100 * (e.pageY - disy - 90)) / parentOffsetHeight + "%";
        let widthNum = (100 * (e.pageX - disx - 190)) / parentOffsetWidth;
        // console.log(widthNum);
        let heightNum = (100 * (e.pageY - disy - 90)) / parentOffsetHeight;
        /*为了可以获取到最新的width和height的值，巧用var self = this;将外部的this引入到内部，实现动态引用的效果*/
        //console.log(self.$el.parentNode.children[i]);
        self.$emit("changeSize", {
          uid: self.item.uid,
          width: widthNum,
          height: heightNum,
        });
        //console.log();
      };
      document.onmouseup = function (e) {
        document.onmousemove = document.onmouseup = null;
        // self.$emit('saveChange',{uid:self.uid,save:true});
      };
    },
    deleteIt: function (e) {
      let oDrag = this.$el;
      //阻止事件冒泡
      e.stopPropagation();
      //获知点击的是第几个控件

      var self = this;
      // let i = parseInt(this.uid.slice(4,));
      let i = this.item.id;
      //console.log(self);
      if (confirm("删除之后将不能恢复,确定删除吗？")) {
        self.$emit("deleate", i);
        //oDrag.parentNode.removeChild(oDrag);
      } else {
        console.log("取消删除元素--" + oDrag.innerHTML);
      }
    },
    copyIt: function (e) {
      let oDrag = this.$el;
      //console.log(oDrag);
      let oDrag1 = oDrag;
      //阻止事件冒泡
      e.stopPropagation();

      console.log();
    },
  },
};
</script>

<style scoped lang="scss">
.scrollText {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

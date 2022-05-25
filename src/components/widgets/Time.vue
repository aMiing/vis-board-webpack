<template>
  <div
    ref="drag"
    class="drag time"
    @mousedown="MoveIt"
    title="时间控件"
    :uid="item.uid"
    :style="{
      position: Position,
      cursor: Cursor,
      overflow: Overflow,
      width: item.widgetWidth + '%',
      height: item.widgetHeight + '%',
      left: item.widgetLeft + '%',
      top: item.widgetTop + '%',
    }"
  >
    <div class="btn" style="position: absolute; left: 0; top: 0; z-index: 99; background: #6bf; font-size: 1vw">
      <div class="copy btn" @click="copyIt" title="复制" style="cursor: pointer; float: left; padding: 2px">
        <a href="#"><i class="iconfont icon-fuzhi1"></i></a>
      </div>
      <div class="deleate btn" @click="deleteIt" title="删除" style="cursor: pointer; float: left; padding: 2px">
        <a><i class="iconfont icon-icon-delete"></i></a>
      </div>
    </div>

    <div class="reSize btn" @mousedown="resizeIt" title="改变大小" style="position: absolute; right: 0; bottom: 0; z-index: 99">
      <el-button size="small" style="cursor: se-resize; background-color: #6bf; color: #000; font-size: 1vw; background: #6bf; border: 0; border-radius: 0">
        <i class="iconfont icon-resize" style="cursor: se-resize"></i>
      </el-button>
    </div>
    <div
      class="timer"
      style="position: absolute; width: 100%; display: table; text-align: center; height: 100%"
      :style="{
        fontWeight: item.fontWeight * 10,
        fontFamily: item.fontFamily,
        fontSize: item.fontSize / 20 + 'vw',
        textAlign: item.textAlign,
        lineHeight: item.height + 'px',
        color: item.fontColor,
      }"
      :format="item.format"
    >
      <div style="display: table-cell; vertical-align: middle">
        <i class="el-icon-time">&nbsp;</i>
        <span class="timeText">{{ item.time }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      time: "",
      Position: "absolute",
      Cursor: "move",
      Overflow: "hidden",
    };
  },
  created: function () {
    Date.prototype.Format = function (fmt) {
      // author: meizz
      var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds(), // 毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      return fmt;
    };
    var refresh;
    var self = this;

    console.log(this.item.textAlign);

    if (self.item.format.slice(String(self.item.format).length - 2, String(self.item.format).length) == "ss") {
      refresh = 1000;
    } else if (self.item.format.slice(String(self.item.format).length - 2, String(self.item.format).length) == "mm") {
      refresh = 60000;
    } else {
      refresh = 3600000;
    }
    //if(this.format.slice(0,-2))
    console.log(self.item.format);
    var date, formatSty;
    var format = document.getElementsByClassName("timer");
    var timeText = document.getElementsByClassName("timeText");
    for (let i = 0; i < format.length + 1; i++) {
      setInterval(function () {
        date = new Date().Format(format[i].getAttribute("format"));
        timeText[i].innerHTML = date;
        //this.time = date;
      }, refresh);
    }
  },
  updated: function () {},
  methods: {
    MoveIt: function (e) {
      // console.log(this.fontColor,this.height);
      var i = parseInt(this.item.uid.slice(4));
      let oDrag = this.$el; //获取操作目标对象
      this.$emit("loadSetting", i);
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
      //console.log(this.$parent.$el.childNodes[0].childNodes[2].getElementsByClassName('leftComponentList')[i]);
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
        self.$emit("changePosition", { uid: self.item.uid, left: leftNum, top: topNum });
      };
      document.onmouseup = function (e) {
        document.onmousemove = document.onmouseup = null;
      };
    },
    resizeIt: function (e) {
      let oDrag = this.$el;
      //阻止事件冒泡
      e.stopPropagation();
      let disx = oDrag.offsetLeft;
      let disy = oDrag.offsetTop;
      //console.log(this.parentNode);

      var self = this;
      var i = parseInt(self.item.uid.slice(4));
      var offsetParent = oDrag.parentNode; //获取父元素
      var parentOffsetWidth = offsetParent.offsetWidth; //获取父元素的宽度
      var parentOffsetHeight = offsetParent.offsetHeight; //获取父元素的宽度
      document.onmousemove = function (e) {
        oDrag.style.width = (100 * (e.pageX - disx - 190)) / parentOffsetWidth + "%";
        oDrag.style.height = (100 * (e.pageY - disy - 90)) / parentOffsetHeight + "%";
        let widthNum = (100 * (e.pageX - disx - 190)) / parentOffsetWidth;
        console.log(widthNum);
        let heightNum = (100 * (e.pageY - disy - 90)) / parentOffsetHeight;
        /*为了可以获取到最新的width和height的值，巧用var self = this;将外部的this引入到内部，实现动态引用的效果*/
        self.$emit("changeSize", { uid: self.item.uid, width: widthNum, height: heightNum });
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
      var self = this;
      //获知点击的是第几个控件
      let i = this.item.id;
      // let i = parseInt(self.uid.slice(4,));
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

<style scoped lang="scss"></style>

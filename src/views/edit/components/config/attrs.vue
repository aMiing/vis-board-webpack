<template>
    <div class="attr-setting">
        <div class="title">
            <span style="padding: 0">{{ data.name }} v1.0.0</span>
        </div>
        <div class="main">
            <el-form label-width="80px" size="mini">
                <el-form-item label="标题名称">
                    <el-input v-model="data.name" @blur="changeStyle(data.id)"></el-input>
                </el-form-item>
                <el-form-item label="图表尺寸(%)">
                    <div class="size">
                        <div class="widgetWidth input-num">
                            <span>宽度</span>
                            <el-input-number ref="widgetWidth" v-model="data.widgetWidth" size="small" :min="1" :max="100"></el-input-number>
                        </div>
                        <div class="widgetHeight input-num">
                            <span>高度</span>
                            <el-input-number ref="widgetHeight" v-model="data.widgetHeight" size="small" :min="1" :max="100"></el-input-number>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="图表位置(%)">
                    <div class="size">
                        <div class="widgetTop input-num">
                            <span>横坐标</span>
                            <el-input-number ref="widgetLeft" v-model="data.widgetLeft" size="small" :min="-20" :max="100"></el-input-number>
                        </div>
                        <div class="widgetTop input-num">
                            <span>纵坐标</span>
                            <el-input-number ref="widgetTop" v-model="data.widgetTop" size="small" :min="-20" :max="100"></el-input-number>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="文本内容">
                    <el-input style="display: none"></el-input>
                    <el-input type="textarea" :rows="1" v-model="data.text" @change="changeStyle(data.id)"></el-input>
                </el-form-item>
            </el-form>

            <el-collapse v-model="activeNames" style="border-left: 0">
                <el-collapse-item title="文本样式" name="1">
                    <el-form>
                        <el-form-item label="字体">
                            <el-select v-model="data.fontFamily" placeholder="请选择字体" @change="changeStyle(data.id)">
                                <el-option v-for="item in fontOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="字体粗细">
                            <div class="block">
                                <el-slider v-model="data.fontWeight" :step="5" @change="changeStyle(data.id)"> </el-slider>
                            </div>
                            <!-- <el-input type="number" v-model="data.fontWeight" :value="data.fontWeight" name="size">  -->
                            <!-- </el-input> -->
                        </el-form-item>
                        <el-form-item label="字体颜色">
                            <el-color-picker v-model="data.fontColor" size="small" @change="changeStyle(data.id)"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="字体大小">
                            <div class="block">
                                <el-slider :min="1" v-model="data.fontSize" @change="changeStyle(data.id)"></el-slider>
                            </div>
                        </el-form-item>
                        <el-form-item label="对齐方式">
                            <el-radio-group v-model="data.textAlign" size="mini">
                                <el-radio-button label="left">居左</el-radio-button>
                                <el-radio-button label="center">居中</el-radio-button>
                                <el-radio-button label="right">居右</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="首行缩进">
                            <div class="block">
                                <el-slider :max="20" v-model="data.tabWidth" @change="changeStyle(data.id)"></el-slider>
                            </div>
                        </el-form-item>
                        <el-form-item label="行高">
                            <div class="block">
                                <el-slider :min="10" :max="60" v-model="data.lineHeight" @change="changeStyle(data.id)"></el-slider>
                            </div>
                        </el-form-item>
                    </el-form>
                    <!-- 标题通用属性设置 -->
                </el-collapse-item>
                <el-collapse-item title="超链接配置" name="2">
                    <el-form ref="form" label-width="80px" size="mini">
                        <el-form-item label="超链接">
                            <el-input style="display: none"></el-input>
                            <el-input v-model="data.url" @change="changeStyle(data.id)"></el-input>
                        </el-form-item>

                        <el-form-item label="新开窗口">
                            <el-radio-group v-model="data.target" @change="changeStyle(data.id)">
                                <el-radio label="_blank">新窗口</el-radio>
                                <el-radio label="_parent">此窗口</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item title="时间格式化" name="2">
                    <el-form ref="form" label-width="80px" size="mini">
                        <el-form-item label="显示格式">
                            <el-select v-model="data.format" placeholder="请选择显示格式" @change="changeStyle(data.id)">
                                <el-option v-for="item in formatOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <!-- //滚动文本特有属性 -->
                <el-collapse-item title="属性控制" name="2">
                    <el-form ref="form" label-width="80px" size="mini">
                        <el-form-item label="文本内容">
                            <el-input style="display: none"></el-input>
                            <el-input type="textarea" :rows="1" v-model="data.text" @change="changeStyle(data.id)"></el-input>
                        </el-form-item>
                        <el-form-item label="滚动方向">
                            <el-radio-group v-model="data.direction" @change="changeStyle(data.id)">
                                <el-radio label="left">向左</el-radio>
                                <el-radio label="right">向右</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="滚动方式">
                            <el-radio-group v-model="data.behavior" @change="changeStyle(data.id)">
                                <el-radio label="scroll">绕圈</el-radio>
                                <el-radio label="alternate">反弹</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="滚动快慢">
                            <div class="block">
                                <el-slider v-model="data.scrollamount" @change="changeStyle(data.id)"></el-slider>
                            </div>
                        </el-form-item>
                        <el-form-item label="背景颜色">
                            <el-color-picker show-alpha v-model="data.bgcolor" size="small" @change="changeStyle(data.id)"></el-color-picker>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <!-- //边框组件特有属性 -->
                <el-collapse-item title="边框设置" name="1">
                    <el-form ref="form" label-width="80px" size="mini">
                        <el-form-item label="边框粗细">
                            <div class="block">
                                <el-slider v-model="data.borderWidth" @change="changeStyle(data.id)"></el-slider>
                            </div>
                        </el-form-item>
                        <el-form-item label="边框颜色">
                            <el-color-picker v-model="data.borderColor" size="small" @change="changeStyle(data.id)"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="边框类型">
                            <el-radio-group v-model="data.behavior" @change="changeStyle(data.id)">
                                <el-radio label="solid">实线</el-radio>
                                <el-radio label="dashed">蚂蚁线</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="圆角大小">
                            <div class="block">
                                <el-slider :max="data.widgetWidth / 2" v-model="data.borderRadius" @change="changeStyle(data.id)"></el-slider>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>

                <el-collapse-item title="发光阴影" name="1">
                    <el-form ref="form" label-width="80px" size="mini">
                        <el-form-item label="发光范围">
                            <div class="block">
                                <el-slider :max="20" v-model="data.shadowWidth" @change="changeStyle(data.id)"></el-slider>
                            </div>
                        </el-form-item>
                        <el-form-item label="发光颜色">
                            <el-color-picker v-model="data.shadowColor" size="small" @change="changeStyle(data.id)"></el-color-picker>
                        </el-form-item>
                        <div class="widgetSize contain-item" style="line-height: 35px; height: 55px; padding-left: 15px">
                            <span>阴影偏移</span>
                            <div class="data-right" style="margin-left: 90px">
                                <div class="widgetWidth input-num">
                                    <el-input-number ref="widgetWidth" v-model="data.shadowX" size="small" :min="-10" :max="10"></el-input-number>
                                    <span>左右偏移</span>
                                </div>

                                <div class="widgetHeight input-num">
                                    <el-input-number ref="widgetHeight" v-model="data.shadowY" size="small" :min="-10" :max="10"></el-input-number>
                                    <span>上下偏移</span>
                                </div>
                            </div>
                        </div>
                        <el-form-item label="背景颜色">
                            <el-color-picker show-alpha v-model="data.bgcolor"></el-color-picker>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <!-- 轮播卡片专属属性 -->
                <el-collapse-item title="属性控制" name="2">
                    <el-form ref="form" label-width="80px" size="mini">
                        <!-- 属性控制下面的二级折叠菜单 -->
                        <el-collapse>
                            <el-collapse-item title="展示图片" name="1">
                                <el-form-item label="图片一">
                                    <el-input placeholder="黏贴第一张图片url" v-model="data.cardsImg1"></el-input>
                                </el-form-item>
                                <el-form-item label="图片一">
                                    <el-input placeholder="黏贴第一张图片url" v-model="data.cardsImg2"></el-input>
                                </el-form-item>
                                <el-form-item label="图片一">
                                    <el-input placeholder="黏贴第一张图片url" v-model="data.cardsImg3"></el-input>
                                </el-form-item>
                            </el-collapse-item>
                        </el-collapse>

                        <el-form-item label="展示方式">
                            <el-radio-group v-model="data.Type" @change="changeStyle(data.id)">
                                <el-radio label="card">卡片式</el-radio>
                                <el-radio label=" ">平铺式</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="滚动快慢">
                            <div class="block">
                                <el-slider @change="changeStyle(data.id)" disabled></el-slider>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <!-- 常规图表专属属性 -->
                <el-collapse-item title="属性控制" name="2">
                    <el-form>
                        <el-form-item label="主题颜色">
                            <el-radio-group v-model="data.colorType" size="mini">
                                <el-radio label="1" border>深色</el-radio>
                                <el-radio label="2" border>浅色</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="背景颜色">
                            <el-color-picker v-model="data.bgColor" show-alpha> </el-color-picker>
                        </el-form-item>

                        <!-- 属性控制下面的二级折叠菜单 -->
                        <el-collapse>
                            <el-collapse-item title="图例设置" name="1">
                                <el-form-item label="图例">
                                    <el-switch v-model="data.legend" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
                                </el-form-item>
                                <el-form-item label="排布方式">
                                    <el-radio-group v-model="data.orient" size="mini">
                                        <el-radio-button label="horizontal">横向</el-radio-button>
                                        <el-radio-button label="vertical">纵向</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="图例位置">
                                    <el-radio-group v-model="data.x" size="mini">
                                        <el-radio-button label="left">左</el-radio-button>
                                        <el-radio-button label="center">中</el-radio-button>
                                        <el-radio-button label="right">右</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="对齐方式">
                                    <el-radio-group v-model="data.align" size="mini">
                                        <el-radio-button label="left">左对齐</el-radio-button>
                                        <el-radio-button label="right">右对齐</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                            </el-collapse-item>
                            <!-- 折线图设置 -->
                            <el-collapse-item title="图形设置" name="2">
                                <el-form-item label="堆叠面积图">
                                    <el-switch v-model="data.area" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
                                </el-form-item>
                                <el-form-item label="显示数据">
                                    <el-switch v-model="data.seriesShow" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
                                </el-form-item>
                                <el-form-item label="数据位置">
                                    <el-radio-group v-model="data.seriesPosition" size="mini">
                                        <el-radio label="top">顶部</el-radio>
                                        <el-radio label="inside">内部</el-radio>
                                        <el-radio label="bottom">底部</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-collapse-item>
                            <!-- 饼图样式 -->
                            <el-collapse-item title="图形设置" name="2">
                                <el-form-item label="图形样式">
                                    <el-radio-group v-model="data.roseType" size="mini">
                                        <el-radio label="">常规</el-radio>
                                        <el-radio label="angle">玫瑰图</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="多圆饼图">
                                    <el-switch v-model="data.level" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
                                </el-form-item>
                                <el-form-item label="显示数据">
                                    <el-switch v-model="data.seriesShow" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
                                </el-form-item>
                                <el-form-item label="数据位置">
                                    <el-radio-group v-model="data.seriesPosition" size="mini">
                                        <el-radio label="top">顶部</el-radio>
                                        <el-radio label="inside">内部</el-radio>
                                        <el-radio label="bottom">底部</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="环形粗细">
                                    <el-slider :min="8" :max="30" v-model="data.thin" @change="changeStyle(data.id)"></el-slider>
                                </el-form-item>
                            </el-collapse-item>
                            <!-- 柱状图属性 -->
                            <el-collapse-item title="图形设置" name="2">
                                <el-form-item label="走势曲线">
                                    <el-radio-group v-model="data.showLine" size="mini">
                                        <el-radio-button label="1">1</el-radio-button>
                                        <el-radio-button label="2">2</el-radio-button>
                                        <el-radio-button label="3">3</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="显示数据">
                                    <el-switch v-model="data.seriesShow" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
                                </el-form-item>
                                <el-form-item label="数据位置">
                                    <el-radio-group v-model="data.seriesPosition" size="mini">
                                        <el-radio label="top">顶部</el-radio>
                                        <el-radio label="inside">内部</el-radio>
                                        <el-radio label="bottom">底部</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-collapse-item>
                            <!-- 散点图属性 -->
                            <el-collapse-item title="图形设置" name="2">
                                <el-form-item label="显示数据">
                                    <el-switch v-model="data.seriesShow" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
                                </el-form-item>
                                <el-form-item label="数据位置">
                                    <el-radio-group v-model="data.seriesPosition" size="mini">
                                        <el-radio label="top">顶部</el-radio>
                                        <el-radio label="inside">内部</el-radio>
                                        <el-radio label="bottom">底部</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-collapse-item>
                            <!-- 仪表盘设置 -->
                            <el-collapse-item title="图形设置" name="1">
                                <el-form size="">
                                    <el-form-item label="数据单位">
                                        <el-input style="display: none"></el-input>
                                        <el-input v-model="data.dataName" @blur="changeStyle(data.id)"></el-input>
                                    </el-form-item>
                                </el-form>
                                <el-form-item label="显示数据">
                                    <div>
                                        <el-input placeholder="请输入内容" v-model="data.minData">
                                            <template slot="prepend">最小值</template>
                                        </el-input>
                                        <el-input placeholder="请输入内容" v-model="data.maxData">
                                            <template slot="prepend">最大值</template>
                                        </el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="边框粗细">
                                    <el-slider v-model="data.axisLineWidth" @change="changeStyle(data.id)"></el-slider>
                                </el-form-item>
                                <el-form-item label="表盘格数">
                                    <el-input-number v-model="data.splitNum" controls-position="right" :min="3" :max="30"></el-input-number>
                                </el-form-item>
                            </el-collapse-item>
                        </el-collapse>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({
                attribute: "linesText",
                name: "test",
                id: "testid",
            }),
        },
    },
    data() {
        return {
            activeNames: "",

            fontOptions: [
                {
                    value: "宋体",
                    label: "宋体",
                },
                {
                    value: "楷体",
                    label: "楷体",
                },
                {
                    value: "罗马",
                    label: "罗马",
                },
                {
                    value: "新宋",
                    label: "新宋",
                },
                {
                    value: "等线",
                    label: "等线",
                },
            ],
            formatOptions: [
                {
                    value: "yyyy/MM/dd hh:mm:ss",
                    label: "年/月/日 时:分:秒",
                },
                {
                    value: "yyyy/MM/dd hh:mm",
                    label: "年/月/日 时:分",
                },
                {
                    value: "yyyy/MM/dd",
                    label: "年/月/日",
                },
                {
                    value: "yyyy-MM-dd hh:mm:ss",
                    label: "年-月-日 时:分:秒",
                },
                {
                    value: "yyyy-MM-dd hh:mm",
                    label: "年-月-日 时:分",
                },
                {
                    value: "yyyy-MM-dd",
                    label: "年-月-日",
                },
                {
                    value: "yyyy.MM.dd hh:mm:ss",
                    label: "年.月.日 时:分:秒",
                },
                {
                    value: "yyyy.MM.dd hh:mm",
                    label: "年.月.日 时:分",
                },
                {
                    value: "yyyy.MM.dd",
                    label: "年.月.日",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.attr-setting {
    //   background-color: #1b1f25;
    .title {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
    }
    .main {
        padding: 12px;

        .size {
            display: flex;
            flex-direction: column;
            height: 70px;
            justify-content: space-between;
        }
    }
    .contain-item {
        line-height: 35px;
        height: 55px;
        padding-left: 15px;
    }
}
</style>

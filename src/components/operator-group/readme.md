# 按钮组使用说明

> 按钮组，可用于卡片场景（图标+文字）； 也可用于表格场景（传递 prop iconOnly=true）。
> 超出`showMaxNum` (默认 5)个按钮会显示`...`，鼠标悬浮展示更多

props:

| prop       | 说明                                | 类型    | 默认值 |
| ---------- | ----------------------------------- | ------- | ------ |
| options    | 按钮组数据                          | Array   | []     |
| data       | 当前列表项(当前数据)                | Object  | {}     |
| showMaxNum | 最大显示按钮组数，超出部门显示`...` | Number  | 5      |
| iconOnly   | 只展示图标，用于表格项              | Boolean | false  |

## 参数说明

### options 详细参数说明

```js
/**
 * name 【必须】 显示名称
 * iconClass 【必须】 图标名称
 * hidden: row => {} [非必须] 根据数据隐藏按钮
 * click [非必须] 点击按钮的触发事件
 * disabled 【非必须】禁用状态
 * disabled.cb() [必须] 禁用状态的回调，返回true表示禁用
 * disabled.tips [必须] 禁用状态鼠标悬浮的提示文案
 * */
const options = [
  {
    name: '发布',
    iconClass: 'iconfabu',
    hidden: row => row.type === '1',
    click: row => this.onlineFunc(row),
    disabled: {
      cb: row => !row.publishable,
      tips: '存在输出算子为数据源输出，该模型不可发布为模板。',
    },
  },
];
```

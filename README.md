# vis-board-webpack

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### TODO lIST

1. 主舞台缩放比例范围扩大到 2 倍
2. 组件列表样式调整 只显示图标，点击在下面展示名称和简介

- 前进后退
- 导出文件

### 数据思路

- 配置数据和记录数据分开
- screenData && screenConfig
- scale 缩放数据不应该作为屏幕数据被存储，会污染属性， scale 的生命周期仅存在于当前次的编辑。

## bug 记录

- vue-drag-resize-remote 修改传入的 width、height 无效

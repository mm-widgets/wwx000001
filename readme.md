# 滑动列表控件

<!-- TOC -->

- [1. 使用方法](#1-使用方法)
- [2. 属性](#2-属性)
- [3. 方法](#3-方法)
	- [3.1. `open()`](#31-open)
	- [3.2. `close()`](#32-close)
- [4. 事件](#4-事件)
	- [4.1. `mmwe-open`](#41-mmwe-open)
	- [4.2. `mmwe-close`](#42-mmwe-close)

<!-- /TOC -->

小程序自定义组件

> 使用此组件需要依赖小程序基础库 2.2.1 以上版本，同时依赖开发者工具的 npm 构建。具体详情可查阅[官方 npm 文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)。

[使用示例](https://developers.weixin.qq.com/s/HlZlvOmO7g42)

## 1. 使用方法

1. 在WXML文件中添加控件

    使用vscode插件的方式添加代码,定位到要添加该控件的代码处,按快捷键`alt+t w`添加控件代码片段

1. 注意

	- 每一个 mm-000001 提供两个`<slot>`节点，用于承载组件引用时提供的子节点。

	- left 节点用于承载静止时 mm-000001 所展示的节点，此节点的宽高应与传入 mm-000001 的宽高相同。

	- right 节点用于承载滑动时所展示的节点，其宽度应于传入 mm-000001 的 slideWidth 相同。

	``` xml
	<mm-000001 class="slide" width="320" height="100" slideWidth="200">
	<view slot="left">这里是插入到组内容</view>
	<view slot="right">
		<view>标为已读</view>
		<view>删除</view>
	</view>
	</mm-000001>
	```

## 2. 属性

| 属性名 | 类型 | 默认值 | 是否必须 | 说明
|-------|-----|-------|---------|------|
| width | Number | 显示屏幕的宽度 | 是 | mm-000001组件的宽度 |
| height | Number | 0 | 是 | mm-000001组件的高度 |
| slide-width | Number | 0 | 是 | 滑动展示区域的宽度（默认高度与控件相同）|
| wid | String | 无 | 是 | 控件标示|

## 3. 方法

### 3.1. `open()`

展开菜单

使用示例：

wxml

```xml
<mm-000001 width="750" height="110" slide-width="500" class='class-name' wid='widget-001'>
	<view slot="left" class="l">
		内容
	</view>
	<view slot="right" class="r" style="background:#ccc;width:250rpx;">
		<view>菜单</view>
	</view>
</mm-000001>
```

### 3.2. `close()`

关闭菜单

## 4. 事件

### 4.1. `mmwe-open`

菜单展开事件

可以通过 e.detail.wid获取控件的唯一标示

### 4.2. `mmwe-close`

菜单折叠事件

可以通过 e.detail.wid获取控件的唯一标示

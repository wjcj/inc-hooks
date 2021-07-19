---
group:
  title: 数据展示
  path: /data-display
  order: 3
---

# useTree

`Tree` 组件接入远程数据。

## 代码演示

```js
const { treeProps, ...useRequestResult } = useTree(service, {
  fieldNames,
  lazy,
  isLeaf,
  ...useRequestOptions,
});
```

### 基本

<code src="./demo/index.jsx" />

### 动态加载

<code src="./demo/lazily.jsx" />

<!-- <code src="./demo/antd4-lazily.jsx" /> -->

## API

### Params

| 参数              | 说明                              | 类型                                                                                | 默认值                                                 |
| ----------------- | --------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------ |
| mode              | 设置 Select 的模式为多选或标签    | `multiple/tags`                                                                     | -                                                      |
| lazy              | 是否异步加载                      | `boolean`                                                                           | `false`                                                |
| isLeaf            | 判断是否是叶子节点                | `func(nodeData) => boolean`                                                         | `nodeData => nodeData.isLeaf`                          |
| fieldNames        | 自动生成 `treeNodes` 字段映射配置 | `{ title: string, key: string, children: string }`                                  | `{ title: 'title', key: 'key', children: 'children' }` |
| useRequestOptions | useRequest 所有配置项             | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api) | 略                                                     |

### Result

| 参数             | 说明                  | 类型                                                                                |
| ---------------- | --------------------- | ----------------------------------------------------------------------------------- |
| treeProps        | `Tree` 组件 `props`   | `{ treeData: [], loadData: func }`                                                  |
| useRequestResult | useRequest 所有返回项 | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api) |

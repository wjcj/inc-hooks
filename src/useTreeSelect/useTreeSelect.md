---
group:
  title: 表单
  path: /form
  order: 2
---

# useTreeSelect

`TreeSelect` 组件接入远程数据。

## 代码演示

```js
const { treeSelectProps, ...useRequestResult } = useTreeSelect(service, {
  lazy,
  treeDataSimpleMode,
  fieldNames,
  isLeaf,
  ...useRequestOptions,
});
```

### 基础

<code src="./demo/index.jsx" />

### 自定义 `TreeSelectNodes`

<code src="./demo/custom.jsx" />

### 异步加载

<code src="./demo/lazily.jsx" />

### `treeDataSimpleMode` 模式

> 使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:'1', title:"test1",...},...]， pId 是父节点的 id)

<code src="./demo/treeData.jsx" />

## API

### Params

| 参数               | 说明                              | 类型                                                                                | 默认值                                                                                                                                                                                                                                 |
| ------------------ | --------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| lazy               | 是否异步加载                      | `boolean`                                                                           | `false`                                                                                                                                                                                                                                |
| treeDataSimpleMode | 是否使用简单格式的 treeData       | `boolean`                                                                           | `false`                                                                                                                                                                                                                                |
| isLeaf             | 判断是否是叶子节点                | `func(nodeData) => boolean`                                                         | `nodeData => nodeData.isLeaf`                                                                                                                                                                                                          |
| fieldNames         | 自动生成 `treeNodes` 字段映射配置 | `{ title: string, value: string, children: string, pId: string, id: string }`       | `{ title: 'title', value: 'value', children: 'children', pId: 'pId', id: 'value' }`，`fieldNames.pId` 与 `fieldNames.id` 在 `treeDataSimpleMode=true` 时配置，`fieldNames.id` 未设置时默认使用与 `fieldNames.value` 相同的字段名映射。 |
| useRequestOptions  | useRequest 所有配置项             | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api) | 略                                                                                                                                                                                                                                     |

### Result

| 参数             | 说明                      | 类型                                                                                                              |
| ---------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| treeSelectProps  | `TreeSelect` 组件 `props` | `{ treeDataSimpleMode: boolean, treeNodeLabelProp: string, treeData: [], children: ReactNode[], loadData: func }` |
| useRequestResult | useRequest 所有返回项     | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api)                               |

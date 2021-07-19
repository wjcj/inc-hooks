---
group:
  title: 表单
  path: /form
  order: 2
---

# useCascader

`Cascader` 组件接入远程数据。

## 代码演示

```js
const { cascaderProps, ...useRequestResult } = useCascader(service, {
  lazy,
  isLeaf,
  fieldNames,
  ...useRequestOptions,
});
```

### 基础

> `Cascader[showSearch]` 暂不支持服务端搜索

<code src="./demo/index.jsx" />

### 动态加载

<code src="./demo/lazily.jsx" />

## API

### Params

| 参数              | 说明                                         | 类型                                                                                | 默认值                                               |
| ----------------- | -------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| lazy              | 是否异步加载                                 | `boolean`                                                                           | `false`                                              |
| isLeaf            | 判断是否是叶子节点                           | `func(nodeData) => boolean`                                                         | `nodeData => nodeData.isLeaf`                        |
| fieldNames        | 自定义 options 中 label name children 的字段 | `{ label: string, value: string, children: string }`                                | `{ label: label, value: value, children: children }` |
| useRequestOptions | useRequest 所有配置项                        | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api) | 略                                                   |

### Result

| 参数             | 说明                    | 类型                                                                                |
| ---------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| cascaderProps    | `Cascader` 组件 `props` | `{ fieldNames: object, loadData: func, options: [] }`                               |
| useRequestResult | useRequest 所有返回项   | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api) |

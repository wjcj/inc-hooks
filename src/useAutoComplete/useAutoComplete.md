---
group:
  title: 表单
  path: /form
  order: 2
---

# useAutoComplete

`AutoComplete` 组件接入远程数据。

## 代码演示

```js
const { autoCompleteProps, ...useRequestResult } = useAutoComplete(service, {
  fieldNames,
  ...useRequestOptions,
});
```

### 基本

<code src="./demo/index.jsx" />

### 自定义

<code src="./demo/custom.jsx" />

## API

### Params

| 参数              | 说明                                 | 类型                                                                                 | 默认值                               |
| ----------------- | ------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------ |
| fieldNames        | 数据化配置选项内容，自动生成 options | `{ label: string/func(item, index, array), value: string/func(item, index, array) }` | `{ label: 'label', value: 'value' }` |
| useRequestOptions | useRequest 所有配置项                | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api)  | 略                                   |

### Result

| 参数              | 说明                        | 类型                                                                                |
| ----------------- | --------------------------- | ----------------------------------------------------------------------------------- |
| autoCompleteProps | `AutoComplete` 组件 `props` | `{ onSearch: func, options: object[] }`                                             |
| useRequestResult  | useRequest 所有返回项       | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api) |

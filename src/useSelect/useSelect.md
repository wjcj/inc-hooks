---
group:
  title: 表单
  path: /form
  order: 2
---

# useSelect

`Select` 组件接入远程数据。

## 代码演示

```js
const { selectProps, ...useRequestResult } = useSelect(service, {
  fieldNames,
  remoteSearch,
  mode,
  ...useRequestOptions,
});
```

### 搜索

<code src="./demo/search.jsx" />

### 多选 & 标签

<code src="./demo/mode.jsx" />

## API

### Params

| 参数              | 说明                                 | 类型                                                                                 | 默认值                               |
| ----------------- | ------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------ |
| mode              | 设置 Select 的模式为多选或标签       | `multiple/tags`                                                                      | -                                    |
| remoteSearch      | 是否开启远程数据搜索                 | boolean                                                                              | false                                |
| fieldNames        | 数据化配置选项内容，自动生成 options | `{ label: string/func(item, index, array), value: string/func(item, index, array) }` | `{ label: 'label', value: 'value' }` |
| useRequestOptions | useRequest 所有配置项                | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api)  | 略                                   |

### Result

| 参数             | 说明                  | 类型                                                                                                         |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------------------ |
| selectProps      | `Select` 组件 `props` | `{ showSearch: boolean, showArrow: boolean, onSearch: func, options: object[], filterOption: boolean/func }` |
| useRequestResult | useRequest 所有返回项 | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api)                          |

---
group:
  title: 表单
  path: /form
  order: 2
---

# useMentions

`Mentions` 组件接入远程数据。

## 代码演示

```js
const { mentionsProps, ...useRequestResult } = useMentions(service, {
  fieldNames,
  ...useRequestOptions,
});
```

### 基本

<code src="./demo/index.jsx" />

### 自定义 `Options`

<code src="./demo/custom.jsx" />

## API

### Params

| 参数              | 说明                            | 类型                                                                                 | 默认值                               |
| ----------------- | ------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------ |
| fieldNames        | 自动生成 `options` 字段映射配置 | `{ label: string/func(item, index, array), value: string/func(item, index, array) }` | `{ label: 'label', value: 'value' }` |
| useRequestOptions | useRequest 所有配置项           | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api)  | 略                                   |

### Result

| 参数             | 说明                    | 类型                                                                                |
| ---------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| mentionsProps    | `Mentions` 组件 `props` | `{ loading: boolean, onSearch: func, children: ReactNode[] }`                       |
| useRequestResult | useRequest 所有返回项   | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api) |

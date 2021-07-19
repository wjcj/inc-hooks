---
group:
  title: 图表
  path: /chart
  order: 4
---

# useChart

`Chart` 组件接入远程数据。
目前 hooks 默认输出 [@ant-design/charts](https://charts.ant.design/zh-CN/guide/start) 组件所需的 Props。

## 代码演示

```js
const { chartProps, ...useRequestResult } = useChart(service, {
  chartOptions,
  ...useRequestOptions,
});
```

### 基本

<code src="./demo/line.jsx" />

## API

### Params

| 参数              | 说明                  | 类型                                                                                | 默认值 |
| ----------------- | --------------------- | ----------------------------------------------------------------------------------- | ------ |
| chartType         | chart 类型            | `line/bar/pie...`                                                                   | -      |
| chartOptions      | chart 所有配置项      | 请查看 [@ant-design/charts](https://charts.ant.design/zh-CN/guide/start)            | 略     |
| useRequestOptions | useRequest 所有配置项 | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api) | 略     |

### Result

| 参数             | 说明                  | 类型                                                                                |
| ---------------- | --------------------- | ----------------------------------------------------------------------------------- |
| chartProps       | `Chart` 组件 `props`  | `{ data: any, loading: boolean, ...chartOptions }`                                  |
| useRequestResult | useRequest 所有返回项 | 请查看 [useRequest](https://ahooks.js.org/zh-CN/hooks/async#%E5%9F%BA%E7%A1%80-api) |

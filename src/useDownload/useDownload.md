---
group:
  title: 数据展示
  path: /data-display
  order: 3
---

# useDownload

## 代码演示

```js
const { buttonProps, href } = useDownload(url, {
  baseURL,
  params,
  qsStringifyConfig,
});
```

### 基本

<code src="./demo/index.jsx" />

## API

### Params

| 参数            | 说明                                          | 类型                                                          | 默认值 |
| --------------- | --------------------------------------------- | ------------------------------------------------------------- | ------ |
| url             | 用于上传的服务器 URL                          | `string`                                                      | -      |
| params          | 查询参数                                      | `object`                                                      | -      |
| ready           | 只有当 `ready` 为 `true` 时，才会更新返回内容 | `boolean`                                                     | `true` |
| stringifyConfig | `qs.stringifyConfig` 配置项                   | 请查看 [qs.stringifyConfig](https://www.npmjs.com/package/qs) | 略     |

### Result

| 参数        | 说明                                   | 类型     |
| ----------- | -------------------------------------- | -------- |
| buttonProps | `{ onClick: func, disabled: boolean }` | `object` |
| href        | 生成的下载完整 URL，可直接作为跳转链接 | `string` |

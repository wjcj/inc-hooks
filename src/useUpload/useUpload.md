---
group:
  title: 表单
  path: /form
  order: 2
---

# useUpload

`Upload` 组件使用。

## 代码演示

```js
const { uploadProps, getValueFromEvent } = useUpload(service, {
  size: 1024,
  width: 186,
  height: 186,
  ...uploadOptions,
});
```

### 基础

<code src="./demo/index.jsx" />

### 校验

<code src="./demo/validate.jsx" />

## API

### Params

| 参数            | 说明                                   | 类型                                                          | 默认值 |
| --------------- | -------------------------------------- | ------------------------------------------------------------- | ------ |
| size            | 文件最大大小（单位 kb）                | `number`                                                      | -      |
| width           | 图片宽度（单位 px）                    | `number`                                                      | -      |
| height          | 图片高度（单位 px）                    | `number`                                                      | -      |
| fileTypes       | 有效文件类型                           | `array`                                                       | -      |
| ignoreErrorFile | 文件校验未通过是否阻止文件进入上传列表 | `boolean`                                                     | false  |
| uploadOptions   | Upload 组件所有配置项                  | 请查看 [Upload](https://ant.design/components/upload-cn/#API) | 略     |

### Result

| 参数              | 说明                                       | 类型                     |
| ----------------- | ------------------------------------------ | ------------------------ |
| uploadProps       | `Upload` 组件 `props`                      | `{ beforeUpload: func }` |
| getValueFromEvent | `Form.Item` 组件 `getValueFromEvent props` | `func`                   |

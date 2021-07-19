---
group:
  title: 数据展示
  path: /data-display
  order: 3
---

# useAntdTable

## 代码演示

```js
const {
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  },
  ...useRequestResult,
} = useAntdTable(
  service,
  {
    form,
    defaultType: 'simple' | 'advance',
    defaultParams: [pagination, formData],
    ...useRequestOptions,
  }
);
```

## API

请查看 [ahooks/useAntdTable](https://ahooks.js.org/zh-CN/hooks/table/use-antd-table)。

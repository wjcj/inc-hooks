---
group:
  title: 服务
  path: /service
  order: 1
---

# createService

创建异步服务，满足数据 mock 和多种数据源配置。

`const { instance, services } = createService(serviceConfigs, config)`。

## 代码演示

### 基本使用

```js
import { createService, useRequest, useSelect, useAntdTable } from 'inc-hooks';

const serviceConfigs = {
  getUserInfo: {
    url: '/user/getUserInfo/{userId}',
    method: 'get',
    mockRule: { id: '@id', name: '@TITLE' },
  },
  getList: {
    url: '/user/list',
    method: 'get',
    'mockRule|99': [{ id: '@id', name: '@TITLE' }],
  },
  getTable: {
    url: '/table',
    method: 'get',
    'mockRule.page|99.10': [{ id: '@id', name: '@TITLE' }],
  },
  // ...
};

const { instance, services } = createService(serviceConfigs);
instance.interceptors.response.use((response) => response.data);

export default (props) => {
  const { data, loading } = useRequest(services.getUserInfo);
  const { selectProps } = useSelect(services.getList);
  const { tableProps } = useAntdTable(services.getTable);
  return (
    <div>
      {data && data.name}
      <Select {...selectProps} />
      <Table {...tableProps} />
    </div>
  );
};
```

### 数据 Mock

**语法**：`mockRule[.resultType][|rule]: value`

- `mockRule`：固定已 `'mockRule'` 开头作为标识。
- `resultType`：（可选，`string`）返回类型。可选的值有：
  - `'page'`：分页数据
- `rule`：（可选，`string`）生成规则，基本同[mockjs 数据模板定义 DTD](http://mockjs.com/0.1/#%E6%95%B0%E6%8D%AE%E6%A8%A1%E6%9D%BF%E5%AE%9A%E4%B9%89%20DTD)。新增规则有：
  - 当 `resultType=page`时，`rule`可设置`total.pageSize`，如`mockRule.page|99.20`
- `value`：属性值，同[mockjs 数据模板定义 DTD](http://mockjs.com/0.1/#%E6%95%B0%E6%8D%AE%E6%A8%A1%E6%9D%BF%E5%AE%9A%E4%B9%89%20DTD)。

```js
const serviceConfigs = {
  getUserInfo: {
    // ...
    // mockRule: { id: '@id', name: '@TITLE' }, // 注释则关闭数据mock，启用真实数据
  },
  getList: {
    // ...
    'mockRule|99': [{ id: '@id', name: '@TITLE' }], // 开启mock数据
  },
  getTable: {
    // ...
    'mockRule.page|99.10': [{ id: '@id', name: '@TITLE' }], // 开启分页mock数据
  },
  // ...
};
```

<code src="./demo/mock.jsx" />

<!-- ### Domino

<code src="./demo/domino.jsx" /> -->

## API

### createService

`const { instance, services } = createService(serviceConfigs, config)`

| 参数           | 说明                                                                                    | 类型     | 默认值 |
| -------------- | --------------------------------------------------------------------------------------- | -------- | ------ |
| serviceConfigs | services 配置，具体如下                                                                 | `object` | -      |
| config         | `axiosConfig`。请查看 [axios](http://www.axios-js.com/zh-cn/docs/#axios-get-url-config) | `object` | 略     |

### serviceConfigs

| 参数                      | 说明                                    | 类型     | 默认值 |
| ------------------------- | --------------------------------------- | -------- | ------ |
| url                       | 请求的服务器 URL                        | `string` | -      |
| baseURL                   | 通过设置一个 `baseURL` 便于传递相对 URL | `string` | -      |
| method                    | 请求方法                                | `string` | -      |
| data                      | 请求参数                                | `object` | -      |
| `mockRule[.type][\|rule]` | mock 数据模板                           | `any`    | -      |

### Result

| 参数     | 说明       | 类型                                                                                                            |
| -------- | ---------- | --------------------------------------------------------------------------------------------------------------- |
| services | 异步服务   | `() => promise`                                                                                                 |
| instance | axios 实例 | 实例配置与方法请查看[这里](http://www.axios-js.com/zh-cn/docs/#%E9%85%8D%E7%BD%AE%E9%BB%98%E8%AE%A4%E5%80%BC)。 |

---
group:
  title: 服务
  path: /service
  order: 1
---

# useRequest

一个强大的管理异步数据请求的 Hook。

## 代码演示

### 默认请求

<code src="./demo/useRequest.jsx" />

### 更多使用方式

请查看 [ahooks/useRequest](https://ahooks.js.org/zh-CN/hooks/async)。

## 基础 API

```javascript
const { data, error, loading, run, params, cancel, refresh, mutate, fetches } =
  useRequest(service, {
    manual,
    initialData,
    refreshDeps,
    onSuccess,
    onError,
    formatResult,
    cacheKey,
    loadingDelay,
    defaultParams,
    pollingInterval,
    pollingWhenHidden,
    fetchKey,
    refreshOnWindowFocus,
    focusTimespan,
    debounceInterval,
    throttleInterval,
    ready,
    throwOnError,
  });
```

### Result

| 参数    | 说明                                                                                                                                                                            | 类型                                                                    |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| data    | <ul><li> service 返回的数据，默认为 `undefined`。</li><li> 如果有 `formatResult`, 则该数据为被格式化后的数据。</li></ul>                                                        | `undefined / any`                                                       |
| error   | service 抛出的异常，默认为 `undefined`                                                                                                                                          | `undefined / Error`                                                     |
| loading | service 是否正在执行                                                                                                                                                            | `boolean`                                                               |
| run     | <ul><li>手动触发 service 执行，参数会传递给 service</li><li>debounce 模式与 throttle 模式返回值为 `Promise<null>`</li></ul>                                                     | `(...args: any[]) => Promise`                                           |
| params  | 当次执行的 service 的参数数组。比如你触发了 `run(1, 2, 3)`，则 params 等于 `[1, 2, 3]`                                                                                          | `any[]`                                                                 |
| cancel  | <ul><li>取消当前请求 </li><li>如果有轮询，停止 </li></ul>                                                                                                                       | `() => void`                                                            |
| refresh | 使用上一次的 params，重新执行 service                                                                                                                                           | `() => Promise`                                                         |
| mutate  | 直接修改 data                                                                                                                                                                   | `(newData) => void / ((oldData)=>newData) => void`                      |
| fetches | <ul><li>默认情况下，新请求会覆盖旧请求。如果设置了 `fetchKey`，则可以实现多个请求并行，`fetches` 存储了多个请求的状态。</li><li>外层的状态为最新触发的 fetches 数据。</li></ul> | `{[key:string]: {loading,data,error,params,cancel,refresh,mutate,run}}` |

### Params

所有的 Options 均是可选的。

| 参数                 | 说明                                                                                                                                                                                                                                                                     | 类型                                    | 默认值   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- | -------- |
| manual               | <ul><li> 默认 `false`。 即在初始化时自动执行 service。</li><li>如果设置为 `true`，则需要手动调用 `run` 触发执行。 </li></ul>                                                                                                                                             | `boolean`                               | false    |
| initialData          | 默认的 data                                                                                                                                                                                                                                                              | `any`                                   | -        |
| refreshDeps          | 在 `manual = false` 时，`refreshDeps` 变化，会触发 service 重新执行                                                                                                                                                                                                      | `any[]`                                 | `[]`     |
| formatResult         | 格式化请求结果                                                                                                                                                                                                                                                           | `(response: any) => any`                | -        |
| onSuccess            | <ul><li> service resolve 时触发，参数为 `data` 和 `params` </li><li> 如果有 `formatResult` ，则 `data` 为格式化后数据。</li></ul>                                                                                                                                        | `(data: any, params: any[]) => void`    | -        |
| onError              | service 报错时触发，参数为 `error` 和 `params`。                                                                                                                                                                                                                         | `(error: Error, params: any[]) => void` | -        |
| fetchKey             | 根据 params，获取当前请求的 key，设置之后，我们会在 `fetches` 中同时维护不同 `key` 值的请求状态。                                                                                                                                                                        | `(...params: any[]) => string`          | -        |
| defaultParams        | 如果 `manual=false` ，自动执行 `run` 的时候，默认带上的参数                                                                                                                                                                                                              | `any[]`                                 | -        |
| loadingDelay         | 设置显示 loading 的延迟时间，避免闪烁                                                                                                                                                                                                                                    | `number`                                | -        |
| pollingInterval      | 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 `run`                                                                                                                                                                                                             | `number`                                | -        |
| pollingWhenHidden    | <ul><li> 在页面隐藏时，是否继续轮询。默认为 `true`，即不会停止轮询 </li><li> 如果设置为 `false` , 在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询 </li></ul>                                                                                                      | `boolean`                               | `true`   |
| refreshOnWindowFocus | <ul><li> 在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 `false`，即不会重新发起请求。 </li><li>如果设置为 `true`，在屏幕重新聚焦或重新显示时，会重新发起请求。</li></ul>                                                                                       | `boolean`                               | `false`  |
| focusTimespan        | <ul><li> 屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求 </li><li> 需要配和 `refreshOnWindowFocus` 使用。 </li></ul>                                                                                          | `number`                                | `5000`   |
| debounceInterval     | 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。                                                                                                                                                                                                                         | `number`                                | -        |
| throttleInterval     | 节流间隔, 单位为毫秒，设置后，请求进入节流模式。                                                                                                                                                                                                                         | `number`                                | -        |
| ready                | 只有当 ready 为 `true` 时，才会发起请求                                                                                                                                                                                                                                  | `boolean`                               | `true`   |
| throwOnError         | 如果 service 报错，我们会帮你捕获并打印日志，如果你需要自己处理异常，可以设置 throwOnError 为 true                                                                                                                                                                       | `boolean`                               | `false`  |
| cacheKey             | <ul><li> 请求唯一标识。如果设置了 `cacheKey`，我们会启用缓存机制 </li><li> 我们会缓存每次请求的 `data` , `error` , `params` , `loading` </li><li> 在缓存机制下，同样的请求我们会先返回缓存中的数据，同时会在背后发送新的请求，待新数据返回后，重新触发数据更新</li></ul> | `string`                                | -        |
| cacheTime            | <ul><li> 设置缓存数据回收时间。默认缓存数据 5 分钟后回收 </li><li> 如果设置为 `-1`, 则表示缓存数据永不过期</li><li> 需要配和 `cacheKey` 使用 </li></ul>                                                                                                                  | `number`                                | `300000` |
| staleTime            | <ul><li> 缓存数据保持新鲜时间。在该时间间隔内，认为数据是新鲜的，不会重新发请求 </li><li> 如果设置为 `-1`，则表示数据永远新鲜</li><li> 需要配和 `cacheKey` 使用 </li> </ul>                                                                                              | `number`                                | `0`      |

## 扩展用法

基于基础的 useRequest，我们可以进一步封装，实现更高级的定制需求。当前 useRequest 内置了 `集成请求库`，`分页` 和 `加载更多` 三种场景。你可以参考代码，实现自己的封装。参考 [useRequest](https://github.com/alibaba/hooks/blob/master/packages/use-request/src/useRequest.ts)、[usePaginated](https://github.com/alibaba/hooks/blob/master/packages/use-request/src/usePaginated.ts)、[useLoadMore](https://github.com/alibaba/hooks/blob/master/packages/use-request/src/useLoadMore.ts) 的实现。

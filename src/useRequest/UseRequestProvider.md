---
group:
  title: 服务
  path: /service
  order: 1
---

# useRequestProvider

```js
import { UseRequestProvider } from 'ahooks';
export function ({children})=>{
  return (
    <UseRequestProvider value={{
      refreshOnWindowFocus: true,
      requestMethod: (param)=> axios(param),
      ...
    }}>
      {children}
    </UseRequestProvider>
  )
}
```

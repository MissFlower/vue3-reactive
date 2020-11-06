import reactive from './reactive'
import effect from './effect'

const obj = {
  name: 'rollup'
}
const proxy = reactive(obj)

effect(() => {
  console.log(proxy.name)
})
proxy.name = '自定义名称'
effect(() => {
  proxy.age = 19
})
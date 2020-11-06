import { isObject } from '../shared'
import baseHandler from './baseHandler'

const proxyMap = new WeakMap() // target为键proxy为值
const targetMap = new WeakMap() // proxy为键target为值
function reactive(target) {
  if (!isObject(target)) { return target }

  // 如果对象被代理过就直接把代理过的对象return出去
  const proxy = proxyMap.get(target)
  if (proxy) {
    console.log('该对象已经被代理了，请勿重复代理')
    return proxy
  }

  // 如果被代理的结果再次被代理 直接把被代理的结果return出去
  if (targetMap.has(target)) {
    console.log('被代理过的对象结果不能再次被代理')
    return target
  }
  // 创建响应式对象
  return createReactiveObject(target)
}

function createReactiveObject(target) {
  const proxy = new Proxy(target, baseHandler)
  proxyMap.set(target, proxy)
  targetMap.set(proxy, target)
  return proxy
}

export default reactive
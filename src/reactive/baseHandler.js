import { isObject, hasOwnProperty, isEqual } from '../shared'
import reactive from './index'
import { track, trigger } from '../effect'

const get = createGetter(),
      set = createSetter()

function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    // console.log('响应式获取值：'+ key + '====='+ res)

    // 收集依赖
    track(target, key)

    return isObject(res) ? reactive(res) : res
  }
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const hasKey = hasOwnProperty(target, key),
          oldValue = Reflect.get(target, key, receiver),
          res = Reflect.set(target, key, value, receiver)
    
    if (!hasKey) {
      // 不存在key 即为添加属性
      // console.log('响应式新增属性：'+ key+ '=======' + value)
      trigger(target, key , 'add')
    } else if (!isEqual(oldValue, value)) {
      // 不存在key 并且修改值和之前值不同时做处理
      // 这里主要是处理数组的问题 数据修改触发两次 一次添加值 一次修改length
      // console.log('响应式修改属性：'+ key+ '=======' + value)
      trigger(target, key , 'set')
    }

    return res // res为布尔值 表示是否修改成功
  }
}

const baseHandler = {
  get,
  set
}
export default baseHandler
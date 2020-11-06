const effectStacks = [] // effect栈
const targetMap = new WeakMap()

function effect(fn, options={}) {
  const effect = createReactiveEffect(fn)
  // 默认先执行一次
  if (!options.lazy) {
    effect()
  }
  return effect
}

function createReactiveEffect(fn) {
  const effect = function() {
    return run(effect, fn) // 1.让fn执行 2.吧effect存到栈中
  }
  return effect
}

function run(effect, fn) {
  if (!effectStacks.includes(effect)) {
    try {
      effectStacks.push(effect)
      fn()
    }finally {
      effectStacks.pop(effect)
    }
  }
}

//  new WeakMap() => new Map() => new Set()
// {
//   target: {
//     key: new Set()
//   }
// }

export function track(target, key) {
  const activeEffect = effectStacks[effectStacks.length - 1]
  if (activeEffect) {

    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, depsMap = new Map())
    }

    let deps = depsMap.get(key)
    if (!deps) {
      depsMap.set(key, deps = new Set())
    }

    if (!deps.has(activeEffect)) {
      deps.add(activeEffect)
    }
  }
}

export function trigger(target, key, type) {
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const deps = depsMap.get(key)
    if (deps) {
      deps.forEach(effect => {
        console.log('响应式属性-------->'+ type)
        effect()
      })
    } else {
      console.log('响应式属性-------->'+ type)
    }
  }
}

export default effect
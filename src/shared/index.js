export function isObject(target) {
  return target !== null && typeof target === 'object'
}

export function hasOwnProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key)
}

export function isEqual(oldValue, newValue) {
  return oldValue === newValue
}
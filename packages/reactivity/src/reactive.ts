import { isObject } from '@vue/shared'
import { mutableHandlers } from './baseHandlers'

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}

export interface Target {
  [ReactiveFlags.IS_REACTIVE]?: boolean
}

export const reactiveMap = new WeakMap<Target, any>()

export function reactive(target: object) {
  if (!isObject(target)) {
    return target
  }

  let existingProxy = reactiveMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  let proxy = new Proxy(target, mutableHandlers)
  reactiveMap.set(target, proxy)
  return proxy
}

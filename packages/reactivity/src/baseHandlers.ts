import { ReactiveFlags, reactiveMap, Target } from './reactive'
import { TrackOpTypes, TriggerOpTypes } from './operations'
import { track, trigger } from './effect'

const get = /*#__PURE__*/ createGetter()

function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (
      key === ReactiveFlags.RAW &&
      receiver === reactiveMap.get(target)
    ) {
      return target
    }

    const res = Reflect.get(target, key, receiver)

    track(target, TrackOpTypes.GET, key)

    return res
  }
}

const set = /*#__PURE__*/ createSetter()

function createSetter(shallow = false) {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    let oldValue = (target as any)[key]

    const result = Reflect.set(target, key, value, receiver)

    trigger(target, TriggerOpTypes.SET, key, value, oldValue)

    return result
  }
}

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set
}

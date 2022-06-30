import { ReactiveFlags, Target } from './reactive'
import { track, trigger } from './effect'
import { TrackOpTypes, TriggerOpTypes } from './operations'

export const mutableHandlers: ProxyHandler<object> = {
  get(target: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }

    track(target, TrackOpTypes.GET, key)

    return Reflect.get(target, key, receiver)
  },
  set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    let oldValue = (target as any)[key]

    let result = Reflect.set(target, key, value, receiver)

    trigger(target, TriggerOpTypes.SET, key, value, oldValue)

    return result
  }
}

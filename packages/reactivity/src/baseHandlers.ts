import { ReactiveFlags, Target } from './reactive'

export const mutableHandlers: ProxyHandler<object> = {
  get(target: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }

    return Reflect.get(target, key, receiver)
  },
  set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    return Reflect.set(target, key, value, receiver)
  }
}

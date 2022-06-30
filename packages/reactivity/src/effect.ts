import { TrackOpTypes, TriggerOpTypes } from './operations'
import { Dep } from './dep'

type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<any, KeyToDepMap>()

export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []
  parent: ReactiveEffect | undefined = undefined

  constructor(public fn: () => T) {}

  run() {
    if (!this.active) {
      return this.fn()
    }

    try {
      activeEffect = this
      return this.fn()
    } finally {
      activeEffect = undefined
    }
  }
}

export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

export function track(target: object, type: TrackOpTypes, key: unknown) {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }

    let shouldTrack = !dep.has(activeEffect)
    if (shouldTrack) {
      dep.add(activeEffect)
      activeEffect.deps.push(dep)
    }
  }
}

export function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }

  let deps = depsMap.get(key)
  let effects: ReactiveEffect[] = []
  if (deps) {
    effects = [...deps]
  }

  for (const effect of effects) {
    if (effect !== activeEffect) {
      effect.run()
    }
  }
}

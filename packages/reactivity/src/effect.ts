export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
  active = true

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

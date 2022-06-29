import { isObject } from '@vue/shared'

export function reactive(target: object) {
  return isObject({})
}

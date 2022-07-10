import { reactive, readonly } from '@vue/reactivity'

let proxy1 = readonly({
  name: 'foo'
})

let proxy2 = reactive(proxy1)

console.log(proxy1 === proxy2)

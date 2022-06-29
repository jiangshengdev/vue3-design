import { reactive } from '@vue/reactivity'

let data = {
  name: 'foo',
  age: 42,
  address: {
    num: 666
  }
}
let state = reactive(data)

console.log(state)

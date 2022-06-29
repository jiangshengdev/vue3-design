import { reactive } from '@vue/reactivity'

let data = {
  name: 'js',
  age: 66,
  address: {
    num: 9
  }
}
let state = reactive(data)

console.log(state)

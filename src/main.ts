import { effect, reactive } from '@vue/reactivity'

let data = {
  name: 'foo',
  age: 42,
  address: {
    num: 666
  }
}
let state = reactive(data)
console.log(state)

effect(() => {
  let app = document.getElementById('app')
  if (app) {
    app.innerHTML = `Name: ${state.name} Age: ${state.age}`
  }
})

setTimeout(() => {
  state.age++
}, 1000)

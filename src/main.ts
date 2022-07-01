let app = document.getElementById('app')
import { effect, reactive } from '@vue/reactivity'

let waiting = false
let data = {
  flag: false,
  name: 'foo',
  age: 42
}
let state = reactive(data)
console.log(state)

let runner = effect(
  () => {
    console.log('effect run')
    if (app) {
      app.innerHTML = state.flag ? state.name : state.age
    }
  },
  {
    scheduler() {
      if (waiting) {
        return
      }

      waiting = true
      setTimeout(() => {
        runner.effect.run()
        waiting = false
      }, 1000)
    }
  }
)

setTimeout(() => {
  state.age = 43
  state.age = 44
  state.age = 45
  state.age = 46
  state.age = 47
}, 1000)

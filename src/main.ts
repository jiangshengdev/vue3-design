import { computed, effect, reactive } from '@vue/reactivity'

// eslint-disable-next-line no-restricted-globals
let app = document.getElementById('app')!

let data = {
  firstname: 'foo',
  lastname: 'bar'
}
let state = reactive(data)
console.log(state)

let fullName = computed({
  get() {
    console.log('GET')
    return `${state.firstname} ${state.lastname}`
  },
  set(newValue: any) {
    console.log('SET')
    let [firstname, lastname] = newValue

    state.firstname = firstname
    state.lastname = lastname
  }
})

effect(() => {
  console.log('RUN EFFECT')
  app.innerHTML = fullName.value
})

setTimeout(() => {
  state.firstname = 'baz'
  setTimeout(() => {
    fullName.value = ['sheng', 'jiang']
  }, 1000)
}, 1000)

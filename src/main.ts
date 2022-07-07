import { computed, effect, reactive } from '@vue/reactivity'

// eslint-disable-next-line no-restricted-globals
let app = document.getElementById('app')!

let state = reactive({
  firstname: 'foo',
  lastname: 'bar'
})

let fullName = computed(function computedFn() {
  console.log('get')
  return `${state.firstname} ${state.lastname}`
})

effect(function effectFn() {
  console.log('run')
  app.innerHTML = fullName.value
})

setTimeout(function setTimeoutFn() {
  state.firstname = 'baz'
}, 1000)

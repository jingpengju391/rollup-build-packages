// import { CodeEditor } from './components/index.ts'

// const components = [ CodeEditor ]
// // install function
// const install = function (Vue: any) {
//   components.forEach(component => Vue.component(component.name, component))
// }
// // determine whether to import the file directly, if so, do not call Vue.use
// // @ts-ignore
// if (typeof window !== 'undefined' && window.Vue) {
//   // @ts-ignore
//   install(window.Vue)
// }
// // export install
// export default { install }

function sum() {
  let args = Array.from(arguments)
  return args.reduce((start, result) => {
    return start + result
  }, 0)
}
export { sum }

import { zzzzz, aaa } from './components'
export { zzzzz, aaa }

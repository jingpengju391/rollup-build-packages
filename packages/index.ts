import type { App, DefineComponent } from 'vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import { CodeXpert, JsonVirtualTable, JsonForm } from './components'

interface Components {
  [key: string]: DefineComponent<{}, {}, any>;
}

const components: Components = { CodeXpert, JsonVirtualTable, JsonForm }

const install = (app: App): void => {
  app.use(VXETable)

  for (const component in components) {
    app.component(components[component].name, components[component])
  }
}

export default {
  install,
  ...components,
}

export * from './components'

# nova-plus-rollup

`nova-plus-rollup` 是使用 Rollup 构建的 Vue 3 组件库。它复刻
`vite-build-packages` 中的公开组件与工具类型，并产出可按需加载的 ESM、
CommonJS、CSS 与 TypeScript 声明文件。

当前仓库用于验证和维护 Rollup 构建方案；`package.json` 暂设为 `private`，
不会被意外发布到 npm。

## 包含内容

| 导出 | 说明 |
| --- | --- |
| `CodeXpert` | 基于 Monaco Editor 的代码编辑器，支持补全、高亮和悬浮信息。 |
| `JsonVirtualTable` | 基于 VXE Table 的可配置表格，支持行列拖拽排序。 |
| `JsonForm` | JSON 表单组件的基础实现。 |
| 组件类型 | 补全项、编辑器配置、表格配置等 TypeScript 类型。 |

## 环境要求

- Node.js 18 或更高版本
- Vue `^3.3.4`
- VXE Table `4.3.9`

Vue 和 VXE Table 是 peer dependencies：应用项目需要自行安装并维护它们的版本。
Monaco Editor、SortableJS 和 UUID 由本库的运行时依赖提供。

## 安装与构建

```bash
npm install
npm run build:all
```

`build:all` 会先用 Rollup 构建 JavaScript 和样式，再用 TypeScript 生成声明文件。

| 命令 | 用途 |
| --- | --- |
| `npm run build` | 生成 ESM、CommonJS、CSS 和 sourcemap。 |
| `npm run build:types` | 只生成 `.d.ts` 和声明 sourcemap。 |
| `npm run build:all` | 完整生产构建。 |
| `npm run start` | 以 Rollup watch 模式持续构建。 |

## 在 Vue 中使用

构建后的默认导出提供 `install`，会注册所有组件并安装 VXE Table：

```ts
import { createApp } from 'vue'
import NovaPlus from 'nova-plus-rollup'
import App from './App.vue'

createApp(App).use(NovaPlus).mount('#app')
```

也可按需注册。此时请由应用自行安装 VXE Table：

```ts
import { createApp } from 'vue'
import VXETable from 'vxe-table'
import { CodeXpert, JsonVirtualTable } from 'nova-plus-rollup'

const app = createApp(App)
app.use(VXETable)
app.component('CodeXpert', CodeXpert)
app.component('JsonVirtualTable', JsonVirtualTable)
```

`CodeXpert` 依赖浏览器环境中的 Monaco Editor，因此不应在服务端渲染期间直接初始化；
需要 SSR 时，请在客户端挂载后再渲染该组件。

## 构建产物

```text
dist/
├── es/             # ESM，入口为 index.mjs
├── lib/            # CommonJS，入口为 index.cjs
├── es/style.css    # ESM 构建提取的样式
├── lib/style.css   # CommonJS 构建提取的样式
└── *.d.ts          # TypeScript 声明文件
```

Rollup 保留源码模块结构，因此支持现代构建工具对组件和工具函数进行 tree-shaking。
Vue、VXE Table、Monaco Editor、SortableJS 与 UUID 均不会被打入库文件，避免与宿主应用
重复安装或产生多个运行时实例。

## 开发说明

构建配置位于 `scripts/rollup.config.base.mjs`：

- ESM 输出：`dist/es`，使用 `.mjs` 扩展名；
- CommonJS 输出：`dist/lib`，使用 `.cjs` 扩展名，避免与 ESM 配置文件冲突；
- SCSS/CSS 由 PostCSS/Sass 处理并提取为 `style.css`；
- `@/*` 映射至 `packages/*`；
- `tsconfig.build.json` 只负责声明文件，`tsconfig.rollup.json` 只负责 Rollup 转译。

构建产物和 `node_modules` 已被 Git 忽略。提交前可执行：

```bash
npm run build:all
```

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /@vue\/(.*)/,
        replacement: pathResolve('packages') + '/$1/src'
      }
    ]
  },
  plugins: [vue()]
})

import { extname, resolve } from 'path'
import { defineConfig } from 'vite'
import { echo } from './src/utils'

const __dirname = import.meta.dirname
const obj = {
    css: 'assets/style.css',
    json: 'assets/json/[name].json',
    woff2: 'assets/font/[name].woff2',
    any: 'assets/[ext]/[name].[ext]',
}

export default defineConfig({
    base: './',
    build: {
        target: 'esnext',
        outDir: resolve(__dirname, 'out/www'),
        emptyOutDir: false,
        rollupOptions: {
            treeshake: true,
            input: resolve(__dirname, 'index.html'),
            output: {
                entryFileNames: 'script.js',
                chunkFileNames: 'lib/[name].js',
                assetFileNames: (info) => {
                    const ext = extname(info.names[0] || '').slice(1)
                    return obj[ext] || obj.any
                },
            },
        },
    },
    resolve: {
        alias: {
            jquery: 'jquery/dist/jquery.slim.min',
            '@': resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 3000,
        strictPort: true,
    },
})

import { out, src, TEST, PROD, DEV, CJS, FORMAT } from './scripts/plugin'
import { echo } from './src/lib/utils'
import { defineConfig } from 'vite'
import { extname } from 'path'

const obj = {
    'css': 'assets/style.css',
    'json': 'assets/json/[name].json',
    'woff2': 'assets/font/[name].woff2',
    'any': 'assets/[ext]/[name].[ext]',
}

export default defineConfig({
    root: src('app/www'),
    base: './',
    esbuild: {
        legalComments: 'none',
        dropLabels: [
            CJS ? 'ESM' : 'CJS',
            PROD ? 'DEV' : '',
            PROD ? 'TEST' : '',
            TEST ? 'TEST' : '',
        ],
        define: {
            DEV: `${DEV}`,
            CJS: `${CJS}`,
            ESM: `${!CJS}`,
            PROD: `${PROD}`,
            TEST: `${TEST}`,
        },
    },
    build: {
        outDir: out('www'),
        emptyOutDir: false,
        rollupOptions: {
            treeshake: true,
            input: src('app/www/index.html'),
            output: {
                entryFileNames: 'script.js',
                chunkFileNames: 'js/[name].js',
                assetFileNames: (info) => obj[extname(info?.names[0]).slice(1)],
                //- assetFileNames: (info) => 'assets/[name].[ext]',
            },
        },
    },
    resolve: {
        alias: {
            'jquery': 'jquery/dist/jquery.slim.min',
            '@': src(),
        },
    },
    server: {
        port: 3000,
        strictPort: true,
    },
})

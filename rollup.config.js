import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import copy from "rollup-plugin-copy";
import replace from "@rollup/plugin-replace";
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from "tailwindcss";

const isDev = process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/main/main.ts",
    output: {
      file: "dist/main/main.js",
      format: "cjs"
    },
    plugins: [
      typescript({
        tsconfig: "tsconfig.main.json"
      }),
      commonjs(),
      nodeResolve({
        extensions: ['.ts', '.mjs', '.js', '.json', '.node'],
        preferBuiltins: true,
      })
    ]
  },
  {
    input: "src/renderer/index.tsx",
    output: {
      file: "dist/renderer/index.js",
      format: "iife"
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.renderer.json"
      }),
      nodeResolve(),
      commonjs(),
      postcss({
        plugins: [
          tailwindcss(),
          autoprefixer()
        ],
        sourceMap: true,
        module: true,
        extract: false,
        minimize: true,
      }),
      babel({
        presets: [
          "@babel/preset-react"
        ],
        babelHelpers: "bundled",
        extensions: ['.jsx', '.js', '.tsx'], 
        exclude: 'node_modules/**'
      }),
      copy({
        targets: [
          { src: "src/renderer/index.html", dest: "dist/renderer" }
        ]
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      isDev && serve({
        contentBase: [
          "dist/renderer"
        ],
        port: "3000"
      }),
      isDev && livereload({
        watch: "dist/renderer"
      })
    ]
  }
]

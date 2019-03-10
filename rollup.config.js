import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
    plugins: [
        typescript({
            tsconfig: "tsconfig.json",
        }),
    ],
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'darian',
  }
}
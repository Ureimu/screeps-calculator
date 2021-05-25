"use strict";

import clear from "rollup-plugin-clear";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

export default {
    input: "src/index.ts",
    output: {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true
    },

    plugins: [
        clear({ targets: ["dist"] }),
        resolve({ rootDir: "src" }),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json",useTsconfigDeclarationDir: false})
    ]
}


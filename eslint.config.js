import globals from "globals";
import pluginJs from "@eslint/js";

import pluginReact from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";


import tseslint from "typescript-eslint";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";

import babelParser from "@babel/eslint-parser";

import react from "@vitejs/plugin-react-swc";

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const customTsFlatConfig = [
    {
        name: "typescript-eslint/base",
        lanuageOptions: {
            parser: tsEslintParser,
            sourceType: "module", // 指定要使用的 ECMAScript 语法版本
        },
        files: ["**/*.{ts, tsx}"], // 指定要检查的文件类型
        rules: {
            ...tsEslintPlugin.configs.recommended.rules,
            "@typescript-eslint/ban-types": 2,
            "@typescript-eslint/no-confusion-non-null-assertion": 2, // 禁止使用混淆的非空断言
        },
        plugin: {
            // @ts特有的语法规则 比如说范型
            "typescript-eslint": tsEslintPlugin,
        },
    },
];

// babel-config
const babelConfig = {
    name: "babel-parse",
    languageOptions: {
        parser: babelParser,
        parserOptions: {
            babelOptions: {
                babelrc: false,
                configFile: false,
                browserlistConfigFile: false,
                presets: ["@babel/preset-env"],
            },
            requireConfigFile: false, // 关闭自动加载配置文件
        },
    },
};

const reactConfig = {
    name: "react-eslint",
    files: files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugin: {
        react: reactPlugin,
        "react-hooks": reactHooksPlugin,
    },
    languageOptions: {
        ...pluginReact.configs.recommended.languageOptions,
        globals: {
            ...globals.es2021,
            ...globals.node,
            ...globals.browser,
        },
    },
    rules: {
        ...pluginReact.configs.recommended.rules,
        "react/react-in-jsx-scope": "0", // 关闭 jsx 语法检查
    },
    settings: {
        react: {
            //需要显示安装react
            version:'detect'
        }
    }
};

const globalsConfig = {
    name: 'global config',
    languageOptions: {
        globals: {
            ...globals.es2022,
            ...globals.browser,
            ...globals.node,
        },
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },
    rules: {
        'no-dupe-class-members': 0,
        'no-redeclare': 0,
        'no-undef': 0,
        'no-unused-vars': 0,
    },
};

export default [
    ...customTsFlatConfig,
    eslint.configs.recommended,
    eslintPluginPrettierRecommended,
    globalsConfig,
    reactConfig,
    babelConfig
];

import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import eslintParserTs from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: eslintParserTs,
            parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        },
    },
    plugins: {
        "@typescript-eslint": eslintPluginTs,
        prettier: prettierPlugin,
    },
    rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
    },
},
];
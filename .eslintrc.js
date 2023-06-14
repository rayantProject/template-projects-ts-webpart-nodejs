module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "import"],
    rules: {
        "no-var": "error",
        eqeqeq: "warn",
        "no-empty-function": "warn",
        "no-empty": "warn",
        "import/no-unresolved": "error",
        "import/no-unused-modules": "warn",
        "import/no-extraneous-dependencies": "error",
    },
};

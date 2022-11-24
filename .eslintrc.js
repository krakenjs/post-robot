module.exports = {
  extends:
    "./node_modules/@krakenjs/eslint-config-grumbler/eslintrc-typescript.js",

  rules: {
    "keyword-spacing": "off",
    "@typescript-eslint/keyword-spacing": "off",

    // off for initial ts conversion
    //  Implicit any in catch clause
    "@typescript-eslint/no-implicit-any-catch": "off",
    // Prefer using an optional chain expression instead, as it's more concise and easier to read
    "@typescript-eslint/prefer-optional-chain": "off",
    // Prefer using nullish coalescing operator (`??`) instead of a logical or (`||`), as it is a safer operator
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    // do not use null as a type
    "@typescript-eslint/ban-types": "off",
    // assigning something to an any type
    "@typescript-eslint/no-unsafe-assignment": "off",
    // returning an any type
    "@typescript-eslint/no-unsafe-return": "off",
    // any in a template literal
    "@typescript-eslint/restrict-template-expressions": "off",
    // no explicit any
    "@typescript-eslint/no-explicit-any": "off",
    // Operands of '+' operation with any is possible only with string, number, bigint or any
    "@typescript-eslint/restrict-plus-operands": "off",
    // calling an any
    "@typescript-eslint/no-unsafe-call": "off",
    // do not dynamically delete keys
    "@typescript-eslint/no-dynamic-delete": "off",
    // for simple iterations use for of
    "@typescript-eslint/prefer-for-of": "off",
    // Generic Object Injection Sink
    "security/detect-object-injection": "off",
  },
};

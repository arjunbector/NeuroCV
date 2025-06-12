import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),

  // {
  //   rules: {
  //     // Turn off all TypeScript-specific rules
  //     "@typescript-eslint/no-unused-vars": "off",
  //     "@typescript-eslint/no-explicit-any": "off",
  //     "@typescript-eslint/explicit-module-boundary-types": "off",
  //     "@typescript-eslint/no-inferrable-types": "off",
  //     "@typescript-eslint/no-empty-function": "off",
  //     "@typescript-eslint/no-unused-expressions": "off",
  //     "@typescript-eslint/ban-ts-comment": "off",
  //     "@typescript-eslint/no-this-alias": "off",
  //     "@typescript-eslint/no-require-imports": "off",
  //     "@typescript-eslint/no-empty-object-type": "off",
  //     // ...you can add more based on what warnings you're getting
  //   },
  // },
];

export default eslintConfig;

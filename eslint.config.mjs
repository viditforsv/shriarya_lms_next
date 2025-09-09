import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Relax rules for templates (auto-generated content)
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "off",
      "jsx-a11y/alt-text": "warn",
    },
    files: ["src/app/templates/**/*"],
  },
  {
    rules: {
      // Keep important rules strict for core functionality
      "@typescript-eslint/no-unused-vars": "error",
      "react-hooks/exhaustive-deps": "error",
      "jsx-a11y/alt-text": "error",
    },
    files: ["src/app/**/*"],
    ignores: ["src/app/templates/**/*"],
  },
];

export default eslintConfig;

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
    ignores: [
      "dev-templates/**/*", // Exclude dev templates from linting entirely
      "src/app/components-demo/**/*", // Exclude component demos from linting
    ],
  },
  {
    rules: {
      // Keep important rules strict for core functionality
      "@typescript-eslint/no-unused-vars": "error",
      "react-hooks/exhaustive-deps": "error",
      "jsx-a11y/alt-text": "error",
    },
    files: [
      "src/app/**/*",
      "src/lib/**/*",
      "src/hooks/**/*",
      "src/contexts/**/*",
      "src/types/**/*",
      "src/middleware.ts",
    ],
    ignores: [
      "src/app/components-demo/**/*",
    ],
  },
];

export default eslintConfig;

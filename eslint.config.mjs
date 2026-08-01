import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Adapted BSMNT scrollytelling foundation (D-006). Keep upstream lifecycle
  // patterns; portfolio-owned scene manager code stays under the normal rules.
  {
    files: ["src/components/case-study/experience/bsmnt/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated v8 coverage report from `npm run test:coverage`.
    "coverage/**",
  ]),
]);

export default eslintConfig;

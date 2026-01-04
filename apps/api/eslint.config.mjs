// @ts-check
import nestJsConfig from "@saas/eslint-config/nest-js";
import tseslint from "typescript-eslint";

export default tseslint.config(...nestJsConfig, {
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
});

import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        console: "readonly",
        document: "readonly",
        window: "readonly",
        fetch: "readonly",
        alert: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
      },
    },
  },
];
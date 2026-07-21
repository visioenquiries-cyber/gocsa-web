import base from "@gocsa/config/eslint";

export default [
  ...base,
  {
    ignores: [".next/**", "src/app/(payload)/**", "src/migrations/**"],
  },
];

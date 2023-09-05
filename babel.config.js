module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/test/tsconfig.json",
    },
  },
  transformIgnorePatterns: ["node_modules/(?!troublesome-dependency/.*)"],
};

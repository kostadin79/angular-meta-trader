const fs = require("fs");
const { pathsToModuleNameMapper } = require("ts-jest");

const tsConfig = require("comment-json").parse(
  fs.readFileSync("./tsconfig.json", { encoding: "utf-8" })
);

const { defaultTransformerOptions } = require("jest-preset-angular/presets");

module.exports = {
  transform: {
    "^.+\\.(ts|js|html|svg)$": [
      "jest-preset-angular",
      {
        ...defaultTransformerOptions,
        isolatedModules: true,
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: "ts-jest-mock-import-meta",
              options: { metaObjectReplacement: { url: 'https://www.url.com' } }
            }
          ]
        }
      }
    ]
  },
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
  testRunner: "jest-jasmine2",
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
      prefix: "<rootDir>",
    })
  },
};

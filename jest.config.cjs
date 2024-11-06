module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTest.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

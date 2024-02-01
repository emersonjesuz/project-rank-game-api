export default {
  // Indica que estamos usando TypeScript
  preset: "ts-jest",

  // Diretório onde os testes estão localizados
  testMatch: ["<rootDir>/test/*.spec.ts"],

  // Diretório onde os arquivos compilados serão armazenados
  // Certifique-se de ajustar isso de acordo com sua estrutura de diretórios
  outDir: "./dist",

  // Mapeamento de cobertura
  collectCoverage: true,
  coverageDirectory: "./coverage",

  // Configurações adicionais do TypeScript
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },

  // Pode ser necessário configurar mocks para módulos externos, se aplicável
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Adicione qualquer configuração adicional do Jest conforme necessário
  // ...
};

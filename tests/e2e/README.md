# Estratégia E2E (Playwright)

## Objetivo
Cobrir regressões críticas com testes de alto valor: autenticação, proteção de rotas, sessão, navegação principal, tema global e fluxo essencial de upload.

## Estrutura
- `tests/e2e/auth`: login, autorização e persistência de sessão.
- `tests/e2e/navigation`: navegação central e tema dark/light.
- `tests/e2e/dashboard`: upload e estado de erro crítico.
- `tests/e2e/fixtures`: fixture enxuta para autenticação reutilizável.
- `tests/e2e/support`: utilitários compartilhados (sem abstrações excessivas).

## Boas práticas aplicadas
- Seletores sem CSS frágil (`getByRole`, `getByLabel`, `getByTestId` quando necessário).
- Sem `wait` arbitrário; uso de auto-wait e `expect` do Playwright.
- `trace` e `screenshot` apenas em falha.
- Retries apenas em CI.

## Ambientes
- **Dev local**: inicia `npm run dev` automaticamente via `webServer`.
- **Staging**: definir `PLAYWRIGHT_BASE_URL=https://staging-url` para rodar sem iniciar servidor local.

## Mocks
Evitar mocks em fluxos críticos de autenticação, navegação e sessão. Usar mocks apenas para dependências externas instáveis (APIs de terceiros), mantendo os cenários críticos próximos do comportamento real.

## CI/CD
- Relatórios: `list`, `html` e `junit`.
- Artefatos de falha em `test-results/artifacts` e `playwright-report`.
- Projetos: Chromium e Firefox para equilíbrio entre cobertura e estabilidade.

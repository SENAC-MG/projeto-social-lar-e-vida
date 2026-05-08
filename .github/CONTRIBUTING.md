# Guia de Contribuição — Lar e Vida

Obrigado pelo interesse em contribuir com o projeto **Lar e Vida**! Este guia define as práticas esperadas para manter a qualidade, segurança e rastreabilidade do código.

---

## Índice

1. [Configuração do ambiente](#1-configuração-do-ambiente)
2. [Fluxo de trabalho](#2-fluxo-de-trabalho)
3. [Padrões de código](#3-padrões-de-código)
4. [Testes](#4-testes)
5. [Commits](#5-commits)
6. [Pull Requests](#6-pull-requests)
7. [Definition of Done](#7-definition-of-done)
8. [Segurança](#8-segurança)
9. [Labels e triagem](#9-labels-e-triagem)
10. [Contato](#10-contato)

---

## 1. Configuração do ambiente

```bash
# Requisitos: Node.js ≥ 20, npm ≥ 10
git clone https://github.com/SENAC-MG/projeto-social-lar-e-vida.git
cd projeto-social-lar-e-vida
npm install            # instala dependências
npm run dev            # inicia o servidor de desenvolvimento em http://localhost:3000
```

Crie um arquivo `.env` na raiz com as variáveis necessárias (consulte o README para a lista atualizada).

---

## 2. Fluxo de trabalho

```
main (protegida)
  └── feature/XXXX-descricao-curta
  └── fix/XXXX-descricao-curta
  └── chore/XXXX-descricao-curta
```

1. Crie uma branch a partir de `main` com nome descritivo.
2. Desenvolva na branch e faça commits incrementais.
3. Abra um Pull Request para `main` com o template preenchido.
4. Aguarde a aprovação da revisão e o **verde de todos os checks obrigatórios**.
5. O merge é feito via **squash** pelo responsável do repositório.

> ⚠️ **Nunca faça push direto para `main`.**

---

## 3. Padrões de código

| Item | Regra |
|------|-------|
| Lint | `npm run lint` — zero erros permitidos |
| Formatação | Siga o estilo existente no projeto (sem Prettier configurado, use o linter como guia) |
| Nomenclatura | `camelCase` para variáveis/funções, `PascalCase` para componentes React |
| Idioma do código | Inglês para variáveis/funções; português nos textos visíveis ao usuário |
| Importações | Caminhos absolutos via `jsconfig.json` quando disponível |

---

## 4. Testes

```bash
npm run build          # verifica que o build não quebra
npm test               # executa testes E2E no Firefox (Playwright)
npm run test:headed    # modo visual (útil para depuração)
```

- Todo código novo que altere comportamento do usuário deve ter cobertura E2E correspondente em `tests/`.
- Os testes devem passar localmente antes de abrir a PR.

---

## 5. Commits

Adote o padrão **Conventional Commits** para manter o histórico legível:

```
<tipo>: <descrição curta no imperativo>

Tipos comuns:
  feat     – nova funcionalidade
  fix      – correção de bug
  refactor – refatoração sem mudança de comportamento
  test     – adição ou correção de testes
  chore    – tarefas de manutenção (deps, CI, config)
  docs     – documentação
  style    – formatação/estilo (sem lógica)
  perf     – melhoria de performance
  security – correção de segurança
```

**Exemplos:**

```
feat: adicionar filtro de data no módulo de empréstimos
fix: corrigir redirecionamento após login com "lembrar-me"
chore: atualizar Playwright para 1.50.0
```

---

## 6. Pull Requests

- Use o título no formato `tipo: descrição concisa` (mesmos tipos dos commits).
- Preencha **todos os campos** do template de PR.
- Verifique que **todos os checks de CI estão verdes** antes de solicitar revisão.
- Resolva todos os comentários de revisão antes do merge.
- PRs com mais de **400 linhas alteradas** devem ser justificados ou divididos.

---

## 7. Definition of Done

Uma PR está pronta para merge **somente** quando:

- [ ] `npm run build` passa sem erros
- [ ] `npm run lint` passa sem erros
- [ ] `npm test` (E2E) passa localmente
- [ ] Todos os checks obrigatórios da CI estão verdes no GitHub
- [ ] A PR tem **ao menos 1 aprovação** de outro contribuidor
- [ ] Todas as conversas de revisão estão resolvidas
- [ ] Não há segredos ou credenciais no diff
- [ ] Documentação atualizada se necessário (README, comentários)

---

## 8. Segurança

- **Nunca commite credenciais**, tokens, senhas ou chaves de API no repositório.
- Variáveis sensíveis devem usar GitHub Secrets ou arquivos `.env` (que estão no `.gitignore`).
- Vulnerabilidades de segurança devem ser reportadas **de forma privada** via [GitHub Security Advisories](https://github.com/SENAC-MG/projeto-social-lar-e-vida/security/advisories/new), não em issues públicas.
- Dependências são auditadas automaticamente via Dependabot e `npm audit` na CI.

---

## 9. Labels e triagem

| Label | Significado |
|-------|-------------|
| `bug` | Comportamento incorreto |
| `funcionalidade` | Nova feature ou melhoria |
| `triagem` | Aguardando avaliação inicial |
| `in-progress` | Em desenvolvimento |
| `bloqueado` | Impedido por dependência externa |
| `stale` | Sem atividade — será fechado em breve |
| `segurança` | Relacionado à segurança do sistema |
| `dependencies` | Atualização de dependência |
| `automated` | Gerado automaticamente (Dependabot, bots) |
| `ci` | Relacionado a CI/CD e automação |
| `frontend` | Código da interface |
| `backend` | Lógica de servidor / actions |
| `database` | Schema Prisma / migrations |
| `tests` | Arquivos de teste |
| `documentation` | Documentação |

---

## 10. Contato

- Issues gerais → [GitHub Issues](https://github.com/SENAC-MG/projeto-social-lar-e-vida/issues)
- Dúvidas e discussões → [GitHub Discussions](https://github.com/SENAC-MG/projeto-social-lar-e-vida/discussions)
- Vulnerabilidades → [Security Advisories](https://github.com/SENAC-MG/projeto-social-lar-e-vida/security/advisories/new)

# Aula 2: Do Código ao Artefacto - O Ciclo de Vida do Software Angular

## 1. O Ciclo de Vida: Do Código ao Artefacto

O código escrito (TypeScript, HTML, SCSS) não é o que o browser executa. O processo de transformação é dividido em três fases:

* **Fase 1: Desenvolvimento:** Programação diária. O Angular CLI usa o `ng serve` para criar um servidor local com *hot reload* (atualização instantânea ao guardar).
* **Fase 2: Build:** O comando `ng build` processa o código para gerar ficheiros estáticos otimizados na pasta `dist/`.
* **Fase 3: Distribuição (Deploy):** O artefacto (pasta `dist/`) é movido para um servidor HTTP (Nginx, Vercel, Netlify). **A aplicação em produção não depende de Node.js**, apenas do servidor web.

## 2. O Motor do Build: `ng serve` vs `ng build`

| Característica | `ng serve` (Development) | `ng build --configuration production` |
| --- | --- | --- |
| **Objetivo** | Testes e desenvolvimento local. | Pacote final para o utilizador. |
| **Compilação** | **JIT** (*Just In Time*). | **AOT** (*Ahead-of-Time*) - pré-compilado. |
| **Source Maps** | Ativos (facilita o debug). | Desativados (reduz o tamanho). |
| **Otimização** | Nenhuma. | Minificação, *Tree-shaking* e Otimização agressiva. |

### Os 4 passos automáticos do `ng build`

1. **Transpilação:** O compilador (`tsc`) converte TypeScript em JavaScript compatível com os browsers.
2. **Bundling:** O Webpack ou esbuild agrupa múltiplos ficheiros em poucos pacotes (`main.js`, `polyfills.js`, `styles.css`).
3. **Minificação:** Elimina espaços, comentários e encurta nomes de variáveis.
4. **Tree-Shaking:** Elimina código morto (funções ou bibliotecas importadas mas não utilizadas).

## 3. O Artefacto Final: A pasta `dist/`

É um pacote autónomo e pronto para distribuição. Contém:

* `index.html`: O ponto de entrada da aplicação.
* `main.js`: O código da aplicação compilado.
* `polyfills.js`: Garante compatibilidade com browsers mais antigos.
* `styles.css`: Estilos globais da aplicação.
* **Assets:** Imagens, fontes e ficheiros estáticos copiados de `src/assets`.
* **Lazy Chunks:** Ficheiros de módulos carregados apenas quando o utilizador acede a essa rota (*on-demand*).

## 4. Orquestração com `npm scripts`

O ficheiro `package.json` gere atalhos de comandos via `npm run [script]`.

* **Scripts Essenciais:**
* `"start": "ng serve"` (Desenvolvimento)
* `"build:prod": "ng build --configuration production"` (Produção)
* `"lint": "ng lint"` (Validação de regras de código/ESLint)
* `"test": "ng test"` (Testes unitários)
* `"ci": "npm run lint && npm run build:prod"` (Pipeline local completo)

* **Regras de Encadeamento:**
* `&&`: Sequencial. O segundo comando só corre se o primeiro tiver **sucesso**.
* `||`: Alternativa. O segundo comando corre se o primeiro **falhar**.
* `pre` / `post`: Prefixos automáticos (ex: `prebuild` corre sempre antes do `build`).

## 5. Variáveis de Ambiente e Contextos

Geridas na pasta `src/environments/` para separar configurações de desenvolvimento e produção.

* `environment.ts`: Desenvolvimento local.
* `environment.prod.ts`: Produção (API URLs reais, chaves de produção).
* **Mecanismo de Troca:** O programador importa sempre o `environment.ts`. O Angular CLI substitui pelo ficheiro correto durante o build conforme a flag `--configuration`.
* **Segurança:** Dados sensíveis (segredos/tokens) **nunca** devem ser commitados no Git. Devem ser carregados via ficheiros `.env` ou variáveis de ambiente no servidor de CI/CD.

## 6. O Conceito de Pipeline e Versionamento

* **Pipeline:** Sequência automatizada de tarefas (Ex: Lint ➔ Testes ➔ Build). Se um passo falhar, o pipeline para, impedindo que código com erros chegue ao utilizador.
* **Versionamento Automático (SemVer):**
* `npm version patch`: 1.0.0 ➔ 1.0.1 (Bugs).
* `npm version minor`: 1.0.0 ➔ 1.1.0 (Novas funções).
* `npm version major`: 1.0.0 ➔ 2.0.0 (Mudanças que quebram a compatibilidade).

* **Changelog:** O uso de *Conventional Commits* permite gerar automaticamente o ficheiro `CHANGELOG.md`.

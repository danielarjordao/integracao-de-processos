# Aula 2: Do Código ao Artefacto - O Ciclo de Vida do Software Angular

## O Ciclo de Vida: Do Código ao Artefacto

O código TypeScript/HTML/SCSS que escreves não é compreendido diretamente pelo browser. O Angular precisa de um processo de transformação.

* **Fase 1: Desenvolvimento:** Escreves o código. O Angular CLI usa o `ng serve` para criar um servidor local com *hot reload* (atualiza automaticamente ao guardar).
* **Fase 2: Build:** O comando `ng build` compila, otimiza e empacota o código, gerando ficheiros estáticos (HTML, JS, CSS).
* **Fase 3: Distribuição (Deploy):** O artefacto gerado (a pasta `dist/`) é copiado para um servidor web (ex: Nginx, Vercel, Netlify) que o entrega aos utilizadores.

## O Motor do Angular: `ng serve` vs `ng build`

Para entender a diferença entre estar a programar e enviar para produção, é crucial comparar estes dois processos:

| Característica | `ng serve` (Desenvolvimento) | `ng build --configuration production` (Produção) |
| --- | --- | --- |
| **Objetivo** | Programação diária e testes locais. | Criar o pacote final otimizado. |
| **Compilação** | JIT (*Just In Time* - em tempo real). | AOT (*Ahead-of-Time* - pré-compilado). |
| **Source Maps** | Sim (facilita o debug no browser). | Não (por segurança e tamanho). |
| **Otimização** | Nenhuma. Bundle maior e mais lento. | Minificação e *Tree-shaking* ativos. Bundle leve. |

**Os 4 passos automáticos do `ng build`:**

1. **Transpilação:** O compilador (`tsc`) traduz o TypeScript para JavaScript compreensível pelo browser.
2. **Bundling:** O Webpack/esbuild junta módulos espalhados em poucos ficheiros principais (`main.js`, `polyfills.js`, `styles.css`).
3. **Minificação:** Remove espaços, comentários e encurta nomes de variáveis para reduzir o peso dos ficheiros.
4. **Tree-Shaking:** Analisa o código e elimina funções/bibliotecas que foram importadas mas nunca utilizadas (código morto)

## O Artefacto Final: A pasta `dist/`

Quando o `ng build` termina, o resultado vive na pasta `dist/`. **Este é o teu produto final.**

* **Independente:** Não precisa de Node.js para correr em produção. É apenas HTML, CSS e JS estático.
* **Conteúdo principal:**
* `index.html`: A única página da aplicação (Single Page Application).
* `main.js`: O teu código compilado.
* `polyfills.js`: Código extra para garantir que funciona em browsers mais antigos.
* `styles.css`: Os estilos globais.

## Orquestração com `npm scripts`

O ficheiro `package.json` funciona como o painel de controlo do projeto. A secção `"scripts"` guarda atalhos (comandos shell) que executas via `npm run [nome-do-script]`.

**Scripts Essenciais:**

* `"start": "ng serve"` ➔ Arranca o servidor de desenvolvimento.
* `"build": "ng build"` ➔ Faz o build normal.
* `"build:prod": "ng build --configuration production"` ➔ Faz o build otimizado para produção.
* `"lint": "ng lint"` ➔ Analisa o código em busca de erros de formatação ou más práticas (ESLint).
* `"test": "ng test"` ➔ Corre os testes unitários (Karma/Jasmine).
* `"ci": "npm run lint && npm run build:prod"` ➔ Executa tarefas em cadeia.

**Regras de encadeamento:**

* `&&` (Sequencial): O segundo comando só corre se o primeiro tiver sucesso. Ex: no script `"ci"`, se o lint falhar, o build de produção é cancelado.
* `pre` / `post`: Prefixos mágicos do npm. Se criares um script chamado `"prebuild"`, ele vai correr automaticamente *sempre* antes de executares `"build"`.

## Variáveis de Ambiente e Contextos

O comportamento da aplicação (ex: URLs de APIs) muda consoante estejas a programar ou em produção. O Angular usa a pasta `src/environments/`:

* `environment.ts`: Usado por defeito (para desenvolvimento local).
* `environment.prod.ts`: Usado quando fazes o build com a flag `--configuration production`. O Angular CLI substitui o ficheiro automaticamente.

**Segurança:** Credenciais sensíveis (tokens, passwords) **nunca** vão para o `environment.ts` nem para o repositório Git. Devem ficar em ficheiros `.env` locais, geridos depois de forma segura pelo servidor (CI/CD).

## Pipeline e Versionamento Automático

Um **Pipeline** é uma linha de montagem automática. Garante que ninguém envia código estragado para produção.

* *Fluxo lógico:* Lint ➔ Testes ➔ Build ➔ Deploy. Se um passo falha, o processo para imediatamente.

**Versionamento (SemVer - MAJOR.MINOR.PATCH):**

* Em vez de mudares os números da versão à mão, usas o npm.
* `npm version patch` (ex: 1.0.0 ➔ 1.0.1): Cria a tag no Git e atualiza o `package.json` para correção de bugs.
* `npm version minor` (ex: 1.0.0 ➔ 1.1.0): Para novas funcionalidades.
* Ferramentas como o `standard-version` leem os teus *Conventional Commits* (`feat:`, `fix:`) e geram o ficheiro `CHANGELOG.md` sozinhos.

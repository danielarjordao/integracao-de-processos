# Aula 6: Integração Contínua e GitHub Actions

## 1. Integração Contínua (CI): Definição e Propósito

A Integração Contínua é uma prática de desenvolvimento de software DevOps onde os programadores fundem (*merge*) regularmente as suas alterações de código num repositório central, disparando compilações (*builds*) e testes automatizados.

* **O Problema (Sem CI):** Os programadores trabalham de forma isolada durante muito tempo. O clássico cenário "na minha máquina funciona" acontece quando se tenta integrar o código no servidor partilhado. Os bugs acumulam-se, a integração torna-se dolorosa e, sob pressão, a verificação manual e o *linting* são ignorados, degradando silenciosamente a base de código.
* **A Solução (Com CI):** Cada `push` ou `pull_request` dispara uma verificação automática. Se o código não passa nos testes, não é integrado. A qualidade torna-se um processo automatizado, não uma escolha opcional.
* **Objetivos Principais:** Detetar e corrigir erros mais rapidamente, melhorar a qualidade do software e reduzir o tempo necessário para validar e lançar novas atualizações.

## 2. GitHub Actions: Conceitos Principais

O GitHub Actions é a plataforma de automação nativa do GitHub que permite definir *workflows* de CI/CD diretamente no repositório.

| Conceito | Descrição | Exemplo Prático |
| :--- | :--- | :--- |
| **Workflow** | O processo de automação definido num ficheiro YAML dentro de `.github/workflows/`. | `ci.yml`, `deploy.yml` |
| **Trigger** | O evento específico que faz o workflow arrancar (`on:`). | `push`, `pull_request`, `workflow_dispatch` (manual) |
| **Job** | Uma unidade de trabalho dentro de um workflow. Por norma, correm em paralelo, cada um na sua máquina virtual. | `build-and-lint`, `build-and-deploy` |
| **Runner** | A máquina virtual (servidor) que executa o *job*. | `ubuntu-latest`, `windows-latest` |
| **Step** | Uma sequência de tarefas dentro de um *job*. Partilham o mesmo *workspace* e correm sequencialmente. | Um comando de terminal (`run: npm ci`) ou uma Action reutilizável (`uses: actions/checkout`) |

## 3. O Pipeline Angular (Passo a Passo)

Um ficheiro YAML é altamente sensível à indentação (devem usar-se sempre dois espaços, nunca *tabs*). Um pipeline de CI padrão para um projeto Angular segue uma sequência estrita:

1. **Checkout (`actions/checkout@v4`):** Clona o repositório no *runner*. Sem isto, a máquina virtual não tem código para trabalhar.
2. **Setup Node (`actions/setup-node@v4`):** Instala a versão especificada do Node.js (ex: v20) para garantir a consistência do ambiente em todos os *builds*.
3. **Cache de Dependências (`actions/cache@v4`):** Guarda a pasta `~/.npm` entre execuções. Usa o *hash* do `package-lock.json` como chave. **Vantagem:** Reduz o tempo de instalação de ~90 segundos para ~20 segundos, poupando os minutos limitados do GitHub Actions.
4. **Install (`npm ci`):** Instala dependências de forma determinística diretamente do `package-lock.json`. É mais rápido e seguro para pipelines de CI do que o `npm install` normal.
5. **Lint (`npm run lint`):** Verifica as regras de estilo e qualidade do código. Se a formatação falhar, o pipeline para imediatamente.
6. **Build (`npm run build`):** Compila o projeto Angular para confirmar que o código é estruturalmente válido e compila sem erros.

## 4. Segurança e Quality Gates

Para garantir que o pipeline de CI protege genuinamente a *branch* principal, devem ser aplicadas regras estritas e medidas de segurança.

* **GitHub Secrets:** Variáveis de ambiente cifradas (ex: `SUPABASE_URL`, `SUPABASE_ANON_KEY`) guardadas em *Settings → Secrets and variables → Actions*. Nunca são expostas nos *logs* ou no código e são acedidas via `${{ secrets.NOME_DO_SECRETO }}`.
* **Quality Gates:** Regras inegociáveis para fazer o *merge* do código. Se os passos de Lint ou Build falharem (Vermelho), o código é rejeitado.
* **Branch Protection Rules:** Configuradas nas definições do repositório. Ao exigir "Require status checks to pass before merging", nem mesmo os administradores do repositório podem contornar um pipeline de CI que esteja a falhar. O *job* `build-and-lint` tem de estar completamente verde para permitir um *merge*.
* **Status Badge:** Um indicador visual dinâmico colocado no `README.md` que reflete a saúde em tempo real (*passing*/*failing*) do último *build* do repositório.

## Tutorial: Configurando GitHub Actions para Integração Contínua

Neste tutorial, vamos configurar o GitHub Actions para realizar integração contínua em um projeto de exemplo. O GitHub Actions é uma plataforma de automação que permite criar fluxos de trabalho personalizados para compilar, testar e implantar seu código diretamente do repositório.
<https://github.com/skills/hello-github-actions>

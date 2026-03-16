# Aula 1: Fundamentos do Git e Estratégias de Branching

## Fundamentos do Git

* **Repositório:** Espaço de armazenamento para o projeto e todo o seu histórico. Pode ser **Local** (na sua máquina) ou **Remoto** (hospedado no GitHub, GitLab, etc.).
* **Commit:** Registo de alterações (um "fotograma") do projeto num momento específico. Identificado por um ID único, autor e data.
* **Push / Pull:** `Push` envia os commits locais para um repositório remoto; `Pull` transfere as alterações de um repositório remoto e aplica-as na branch local.

## Estratégias de Branching (Ramificação)

| Estratégia | Estrutura | Prós | Contras |
| --- | --- | --- | --- |
| **Git Flow** | Complexa: `main`, `develop`, `feature/*`, `release/*`, `hotfix/*`, `bugfix/*` | Muito estruturada; excelente para lançamentos planeados e QA formal. | Sobrecarga de gestão; propícia a conflitos de integração; inadequada para entrega contínua. |
| **GitHub Flow** | Simples: `main` (sempre estável) + branches de apoio (`feature/` ou `bugfix/`) | Focada em colaboração via Pull Requests; ideal para entrega contínua (CD). | Capacidade limitada para gerir lançamentos estruturados; depende de testes automatizados robustos. |
| **Trunk-Based** | Minimalista: Commits pequenos e frequentes diretamente na `main` (trunk). | Minimiza conflitos de merge; permite verdadeira entrega contínua. | Requer infraestrutura de testes sofisticada; dependência do uso de *feature toggles*. |

**Regra para Nomenclatura:**

* `feature/*`: Isolar o desenvolvimento de novas funcionalidades.
* `bugfix/*`: Corrigir erros não críticos identificados na branch `develop`.
* `hotfix/*`: Correção urgente de um incidente crítico já em produção.
* `release/*`: Preparação e estabilização de uma nova versão (QA, ajustes de configuração, versionamento).

## Pull Requests (PRs) e Code Review

Um PR é o pedido formal para integrar (merge) código numa branch de destino. Funciona como ponto central para revisão de código, discussão técnica e validação automática (CI) antes da integração.

* **Anatomia do PR:** Título informativo, contexto bem definido e escopo claro (ex: separar a migração da base de dados da implementação da interface em PRs distintos).
* **Draft PR:** Trabalho em progresso (WIP). Permite partilhar código sem solicitar formalmente a revisão automática ou permitir o merge até ser marcado como *Ready for Review*.
* **Branch Protection Rules:** Regras no GitHub que garantem a segurança do fluxo de trabalho (ex: proibir *force push*, obrigar a passar em verificações de estado, exigir aprovação de revisores).

**Checklist de Code Review Estruturado:**

1. **Qualidade:** O código é legível? Existem duplicações? Segue os padrões do projeto?
2. **Arquitetura:** A solução é adequada? O código está bem modularizado?
3. **Boas Práticas:** Nomenclatura consistente? Funções pequenas e claras? Tratamento de erros adequado?
4. **Segurança:** Existem credenciais expostas? Os *inputs* estão validados?
5. **Performance:** Existem operações desnecessárias?

## Padronização: Conventional Commits e SemVer

**Conventional Commits**
Mensagens de commit padronizadas para facilitar a leitura e automação. Formato: `tipo(escopo): descrição`.
*Exemplo:* `feat(shopping cart): add the amazing button`

* `feat`: Nova funcionalidade.
* `fix`: Correção de um erro/bug.
* `refactor`: Reestruturação de código sem alterar o comportamento.
* `perf`: Refatoração focada especificamente na melhoria de performance.
* `style`: Formatação do código (espaços, ponto-e-vírgula) que não afeta o comportamento.
* `test`: Adição de testes em falta ou correção dos existentes.
* `build`: Alterações no processo de compilação ou dependências.
* `ops`: Alterações operacionais (infraestrutura/IaC, pipelines CI/CD, monitorização).
* `docs`: Alterações exclusivas na documentação.
* `chore`: Tarefas de manutenção (ex: commit inicial, modificar `.gitignore`).

**SemVer (Semantic Versioning)**
Sistema padrão de versionamento: **MAJOR.MINOR.PATCH** (ex: `v2.1.4`)

* **MAJOR (2):** Alterações incompatíveis (*breaking changes*).
* **MINOR (1):** Novas funcionalidades compatíveis com versões anteriores.
* **PATCH (4):** Correções de erros compatíveis.
* **Extensões:** `-alfa`, `-beta`, `-rc` (Release Candidate) indicam versões de pré-lançamento.

**Tags vs. Releases:**

* **Tag:** Referência ou marcação de um ponto específico no histórico do Git (ex: `v1.2.0`). É apenas uma referência local/remota.
* **Release:** Versão publicada do software no GitHub, baseada numa Tag. Inclui notas de lançamento, artefactos compilados para download (ZIP, tar.gz) e aciona alertas de segurança.

## Ficheiros de Configuração Base

* **`.gitignore`**: Especifica ficheiros ou diretórios que não devem ser incluídos no controlo de versão (ex: ficheiros temporários, artefactos de compilação, `node_modules/`, `.env`).
* **`.gitattributes`**: Define regras específicas sobre como o Git deve tratar determinados ficheiros, garantindo consistência entre sistemas operativos (ex: normalizar finais de linha de texto, tratar imagens como binários para evitar conflitos de merge).

## Lembrete Prático

* **Review pull requests:** A revisão de código é uma prática essencial para manter a qualidade do software, promover a partilha de conhecimento e reduzir o risco de introdução de bugs. Recomanda-se que cada PR seja revisado por pelo menos um colega antes de ser integrado na branch principal. Para mais detalhes sobre como realizar uma revisão eficaz, consulte o guia oficial do GitHub:
<https://github.com/skills/review-pull-requests>

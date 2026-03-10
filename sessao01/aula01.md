# Aula 1: Fundamentos do Git e Estratégias de Branching

## Fundamentos do Git

* **Repositório:** Onde o código e o histórico vivem. Pode ser **Local** (na tua máquina) ou **Remoto** (no GitHub/GitLab).
* **Commit:** Um "fotograma" do projeto num dado momento. Tem um ID único, autor e data.
* **Push / Pull:** Enviar (`push`) os teus commits locais para o servidor remoto, ou descarregar (`pull`) as alterações do servidor para a tua máquina.

## Estratégias de Branching (Ramificação)

A forma como a equipa organiza a criação de branches dita o fluxo de trabalho.

| Estratégia | Estrutura | Prós | Contras |
| --- | --- | --- | --- |
| **Git Flow** | Complexa: `main`, `develop`, `feature/*`, `release/*`, `hotfix/*` | Muito estruturado; excelente para versões planeadas de software. | Sobrecarga de gestão; propício a conflitos de merge; não ideal para CI/CD contínuo. |
| **GitHub Flow** | Simples: `main` (sempre estável) + branches de apoio (`feature` ou `bugfix`) | Focado em pull requests; excelente para entrega contínua (CI/CD). | Fraco para gerir múltiplas versões do software em simultâneo; exige testes automatizados fortes. |
| **Trunk-Based** | Minimalista: Commits pequenos e frequentes diretamente na `main` (trunk). | Zero "merge hell"; verdadeira integração contínua. | Exige infraestrutura de testes brutal; obriga ao uso de *feature toggles* (esconder código incompleto). |

**Regra de Ouro para Nomenclatura:**

* `feature/*`: Novas funcionalidades isoladas.
* `hotfix/*`: Correção urgente de um "incêndio" já em produção.
* `release/*`: Preparação e estabilização de uma nova versão.

## Pull Requests (PRs) e Code Review

O PR é o pedido formal para fundir (merge) o teu código na branch principal.

* **Anatomia de um bom PR:** Título descritivo, contexto bem definido e escopo claro (ex: separar a criação da base de dados da criação da interface de utilizador em PRs diferentes).
* **Draft PR:** O PR fica em modo "rascunho" (Trabalho em Progresso / WIP). Permite que a equipa veja o código, mas bloqueia o merge e não notifica os revisores até ser marcado como *Ready for Review*.
* **Branch Protection Rules:** Regras aplicadas no GitHub (ex: proibir apagar a branch `main`, proibir *force push*, obrigar a aprovação de pelo menos 1 revisor antes de fazer merge).

**Checklist de Revisão de Código (Code Review):**

1. **Qualidade:** O código é legível? Há repetições?
2. **Arquitetura:** A solução faz sentido? O código está modular?
3. **Boas Práticas:** O *naming* é claro? As funções são pequenas?
4. **Segurança:** Há *passwords* ou credenciais expostas no código?
5. **Performance:** Há *loops* ou queries à base de dados desnecessárias?

## Padronização: Conventional Commits e SemVer

A padronização facilita a automação e a leitura do histórico.

**Conventional Commits:**
O título do commit deve começar com uma tag específica:

* `feat:` Nova funcionalidade.
* `fix:` Correção de um bug.
* `refactor:` Reescrita de código sem alterar o que ele faz.
* `style:` Formatação (espaços, ponto-e-vírgula).
* `docs:` Alterações no README ou documentação.
* `chore:` Tarefas de manutenção (ex: atualizar dependências, modificar `.gitignore`).

**SemVer (Semantic Versioning):**
Sistema padrão de numeração de versões: **MAJOR.MINOR.PATCH** (ex: `v2.1.4`)

* **MAJOR (2):** *Breaking changes* (mudanças que quebram compatibilidade com a versão anterior).
* **MINOR (1):** Novas funcionalidades compatíveis com a versão atual.
* **PATCH (4):** Correção de bugs.

**Tags vs Releases:**

* **Tag:** Apenas uma etiqueta no histórico do Git apontando para um commit específico (ex: `v1.0.0`).
* **Release:** Um pacote publicado no GitHub baseado numa tag. Inclui notas de lançamento, binários/artefactos para download e alertas.

## Ficheiros de Configuração Base

**`.gitignore`**
Diz ao Git o que **não** deve ser enviado para o repositório (ficheiros locais, credenciais, pastas pesadas geradas automaticamente).

```gitignore
# Ignore node dependencies
node_modules/

# Ignore compiled output
dist/

# Ignore environment variables and secrets
.env

# Ignore system files
.DS_Store

```

**`.gitattributes`**
Garante que o Git trata certos ficheiros da mesma forma, independentemente do sistema operativo da equipa (Windows, Mac, Linux).

```gitattributes
# Auto-normalize line endings
* text=auto

# Treat images as binary to prevent text merge conflicts
*.png binary
*.jpg binary
```

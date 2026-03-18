# Aula 7: Continuous Delivery, Deployment e Pipeline End-to-End

## 1. CI vs CD: A Diferença Fundamental

Enquanto a Integração Contínua (CI) foca na verificação do código, o CD foca na entrega. O "D" pode significar duas coisas dependendo do nível de automação da equipa:

| Modelo | O que significa? | Intervenção Humana | Caso de Uso |
| :--- | :--- | :--- | :--- |
| **Continuous Delivery (Entrega)** | O código está sempre *pronto* para ir para produção. | **Sim.** Um gestor ou *tech lead* aprova e clica no botão de *deploy*. | Ambientes empresariais tradicionais (maior controlo e governança). |
| **Continuous Deployment (Implementação)** | O código vai para produção automaticamente se o CI passar. | **Não.** O *deploy* acontece em minutos após o *merge*. | Empresas de alta performance técnica (Netflix, Amazon), requer testes exaustivos e *rollbacks* automáticos. |

## 2. Plataformas de Hosting (Frontend)

O artefacto final gerado pelo Angular (a pasta `dist/`) contém apenas ficheiros estáticos que não precisam de um servidor Node.js para correr, sendo ideais para CDNs (Content Delivery Networks).

* **Vercel:** Especializada em frontend (criadores do Next.js). Suporta Angular nativamente, oferece HTTPS automático, *previews* por Pull Request e excelente integração com o GitHub.
* **Netlify:** Plataforma genérica muito robusta. Oferece funcionalidades extra como formulários e funções *serverless*. Fácil de configurar com *deploy* automático.
* **GitHub Pages:** A opção mais simples e gratuita. Serve os ficheiros diretamente do repositório. Não tem servidor ativo e possui algumas limitações de roteamento (exige configuração extra para SPAs).

## 3. O Workflow de CD (`cd.yml`)

A separação entre `ci.yml` e `cd.yml` é uma boa prática arquitetural. Permite pausar o *deploy* sem parar os testes de código.

* **O Trigger:** Ao contrário do CI (que corre em PRs), o CD geralmente arranca com um `push` na branch `main` (que ocorre após o *merge* de um PR).
* **A Regra de Ouro:** O CD **só corre** se o CI tiver passado. Nunca se faz *deploy* de código não validado.
* **A Sequência:** Checkout → Setup Node → `npm ci` (com cache) → `npm run build --configuration production` → Upload para a plataforma de hosting (via token/CLI).

## 4. GitHub Environments e GHCR (Docker)

Para simular fluxos empresariais complexos, o GitHub oferece ferramentas de controlo de acesso e registo de contentores.

* **GitHub Environments:** Permitem criar contextos isolados (ex: `staging`, `production`). Podes configurar **Required Reviewers** (Aprovações Manuais). O pipeline CI/CD corre automaticamente, mas pausa no último segundo e só publica em produção após o clique de um administrador.
* **GHCR (GitHub Container Registry):** É o local nativo do GitHub para guardar imagens Docker.
  * Usa o token automático `${{ secrets.GITHUB_TOKEN }}` para autenticação (não precisas de criar chaves manuais).
  * **Boa prática:** Usar o *hash* do commit (`${{ github.sha }}`) como *tag* da imagem Docker para garantir rastreabilidade total de que versão está a correr em produção.

## 5. Checklist de Segurança para Produção

Antes de qualquer código ir para produção, a pipeline deve garantir:

1. **Zero Secrets no Código:** Chaves, *tokens* ou *passwords* nunca ficam no repositório. O `.env` deve estar estritamente no `.gitignore`.
2. **Princípio do Mínimo Privilégio (Least Privilege):** Os *tokens* de *deploy* (como o `VERCEL_TOKEN` ou o `GITHUB_TOKEN`) devem ter apenas as permissões estritamente necessárias.
3. **Dependências Fixas:** Usar sempre `npm ci` (lê o `package-lock.json`) para evitar que uma dependência atualizada silenciosamente quebre a produção.
4. **HTTPS Obrigatório:** Nunca expor a aplicação em HTTP.

## 6. O Pipeline End-to-End (A Visão Global)

Este é o ciclo completo que deves demonstrar na tua defesa do projeto:

1. **Desenvolvimento:** Criação de *feature branch* e *commit*.
2. **Integração (CI):** Abertura de PR. O GitHub Actions corre o `ci.yml` (Lint e Build). O resultado (Verde/Vermelho) bloqueia ou liberta o PR.
3. **Revisão:** Com o CI verde e a aprovação humana, faz-se o *merge* para a `main`.
4. **Entrega (CD):** O *merge* dispara o `cd.yml`. O projeto é compilado para produção.
5. **Produção:** A aplicação é publicada na Vercel/Netlify/GH Pages com HTTPS e uma imagem Docker é guardada no GHCR.

## 7. Tutoriais e Referências Oficiais

* [Exemplos de CI/CD com GitHub Actions (Repositório Vercel)](https://github.com/vercel/examples/tree/main/ci-cd/github-actions)
* [Guia Oficial: Como usar o GitHub Actions com a Vercel](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel)

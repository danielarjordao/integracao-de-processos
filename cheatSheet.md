# Cheat Sheet: Do Código à Cloud

## 1. Git, GitHub Flow e Versionamento

| Ação | Comando / Regra |
| --- | --- |
| **Criar Branch** | `git checkout -b feature/nome-da-tarefa` (ou `bugfix/`, `hotfix/`) |
| **Commit Padrão** | `git commit -m "feat(auth): add login form"` |
| **Tipos de Commit** | `feat` (novo), `fix` (erro), `refactor` (código), `style` (formatação), `docs` (docs), `chore` (manutenção) |
| **SemVer Automático** | `npm version patch` (bug) / `minor` (feat) / `major` (breaking) |
| **Push** | `git push origin feature/nome-da-tarefa` |

## 2. Angular CLI e npm scripts (package.json)

| Ação | Comando | Descrição |
| --- | --- | --- |
| **Servidor Local** | `npm run start` | Executa `ng serve` (JIT, *hot reload*, com *source maps*). |
| **Build de Produção** | `npm run build:prod` | Executa `ng build --configuration production` (AOT, otimizado). |
| **Testes e Qualidade** | `npm run lint` / `npm run test` | Valida formatação (ESLint) e executa testes unitários. |
| **Pipeline Local** | `npm run ci` | Ex: `"npm run lint && npm run build:prod"`. |

## 3. Docker (Contentores Isolados)

| Ação | Comando |
| --- | --- |
| **Construir Imagem** | `docker build -t nome-projeto:v1 .` |
| **Executar Contentor** | `docker run -p 8080:80 -d --name meu-app nome-projeto:v1` |
| **Listar Ativos** | `docker ps` |
| **Ver Logs** | `docker logs -f id_ou_nome` |
| **Parar / Remover** | `docker stop id` / `docker rm id` / `docker rmi imagem` |
| **Publicar (Registry)** | `docker tag img:v1 user/img:v1` ➔ `docker push user/img:v1` |

```dockerfile
# Multi-stage build example
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build:prod

FROM nginx:alpine
# Copy artifact from the build stage
COPY --from=build /app/dist/projeto /usr/share/nginx/html
EXPOSE 80

```

## 4. Docker Compose (Orquestração Local)

| Ação | Comando | Descrição |
| --- | --- | --- |
| **Subir Serviços** | `docker compose up -d --build` | Constrói e arranca tudo em *background*. |
| **Parar e Limpar** | `docker compose down` | Remove contentores e redes (volumes persistem). |
| **Status** | `docker compose ps` | Lista o estado dos serviços do projeto. |
| **Logs em Tempo Real** | `docker compose logs -f [nome-do-serviço]` | Se omitir o serviço, mostra os logs de todos. |
| **Aceder ao Terminal** | `docker compose exec [nome-do-serviço] sh` | Abre a *shell* dentro do contentor a correr. |
| **Configuração** | `--env-file .env.dev` | Carrega variáveis de ambiente específicas. |

## 5. Supabase (BaaS / PostgreSQL)

| Ação | Código / Comando |
| --- | --- |
| **Instalação** | `npm install @supabase/supabase-js` |
| **Inicialização** | `const supabase = createClient(URL, ANON_KEY);` |
| **Query (Exemplo)** | `const { data, error } = await supabase.from('tabela').select('*');` |
| **Autenticação** | `const { user } = await supabase.auth.getUser();` |
| **Storage (Upload)** | `supabase.storage.from('bucket').upload(path, file);` |
| **Regra de Segurança** | **Sempre ativar o RLS** e criar políticas (ex: `auth.uid() = user_id`). |

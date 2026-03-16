# Aula 3 - Contentores e Virtualização

## Docker

O Docker é uma plataforma de contentores que isola a aplicação e as suas dependências num ambiente leve e portátil. Garante que o código funcione da mesma forma em desenvolvimento, teste e produção, resolvendo o problema do "funciona na minha máquina".

### Conceitos Fundamentais

* **Imagem Docker:** Pacote imutável, leve e executável com tudo o que é necessário para a aplicação (código, runtime, bibliotecas). Criada a partir de um **Dockerfile**.
* **Contentor Docker:** Instância em execução de uma imagem. Partilha o kernel do host, mas é isolado. É **efémero** (pode ser destruído e recriado rapidamente).
* **Layers (Camadas):** Instruções do Dockerfile criam camadas. São reutilizáveis e armazenadas em cache, otimizando o build.
* **Registry:** Repositório de imagens. Exemplos: **Docker Hub** (público) e **GHCR** (GitHub Container Registry).

## Virtualização vs. Contentores

A virtualização cria "ilusões" de hardware físico, permitindo múltiplos ambientes num único recurso.

| Aspecto | Docker (Contentores) | Virtualização (VMs) |
| --- | --- | --- |
| **Isolamento** | Partilha o kernel do host. Isola processos. | Cada VM tem o seu próprio Kernel e SO. |
| **Performance** | Leve e arranque em segundos. | Pesado e arranque em minutos. |
| **Recursos** | Utiliza menos recursos (MBs). | Utiliza mais recursos (GBs). |
| **Analogia** | Apartamento num edifício comum. | Casa independente com fundações próprias. |

## Prática: Fluxo de Trabalho e Dockerfile

### 1. Criação do Roteiro (Dockerfile)

O ficheiro define o ambiente como código. Cada instrução gera uma nova layer.

**Instruções (Keywords):**

* `FROM`: Define a imagem base (ex: `node:20-alpine`).
* `WORKDIR`: Define o diretório de trabalho dentro do contentor.
* `COPY`: Copia ficheiros do host para o contentor.
* `RUN`: Executa comandos durante o build (ex: `npm install`).
* `EXPOSE`: Indica as portas que o contentor escuta (documentação).
* `CMD`: Define o comando padrão quando o contentor inicia.

**Exemplo de Multi-Stage Build (Angular):**
Esta técnica é essencial para reduzir o tamanho da imagem final, separando o ambiente de compilação do de execução.

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:prod

# Stage 2: Serve
FROM nginx:alpine
# Copia apenas o artefacto (pasta dist) do estágio de build
COPY --from=build /usr/src/app/dist/seu-projeto /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

```

### 2. Otimização (.dockerignore)

Impede que o Docker copie ficheiros desnecessários para o contexto de build, mantendo a imagem leve e segura.

```text
node_modules/
dist/
.git/
.env
Dockerfile
.dockerignore

```

### 3. Comandos Essenciais (Build e Run)

* **Construção:** `docker build -t meu-projeto:v1 .` (O `.` indica o diretório atual).
* **Execução Interativa:** `docker run -it --name meu-contentor meu-projeto:v1`
* **Mapeamento de Portas:** `docker run -p 8080:80 meu-projeto:v1` (Acede em `localhost:8080`).

### 4. Gestão e Publicação

* **Inspecionar:** `docker ps` (ativos), `docker logs [id]` (ver output), `docker inspect [id]`.
* **Limpar:** `docker stop [id]`, `docker rm [id]` (apaga contentor), `docker rmi [imagem]` (apaga imagem).

* **Publicar:**

1. `docker login`
2. `docker tag meu-projeto:v1 utilizador/meu-projeto:v1`
3. `docker push utilizador/meu-projeto:v1`

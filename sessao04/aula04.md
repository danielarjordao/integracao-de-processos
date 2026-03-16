# Aula 04 - Docker Compose: Orquestração de Multi-Contentores

## 1. O que é o Docker Compose

O Docker Compose é uma ferramenta (orquestrador local) que permite definir e gerir aplicações multi-contentor. Através de um único ficheiro YAML (`docker-compose.yml`), descrevemos todos os serviços, redes e volumes, permitindo levantar uma infraestrutura complexa com um só comando.

### Quando um contentor não é suficiente

Aplicações reais raramente são um processo único. Numa arquitetura moderna, temos:

* **Frontend:** (ex: Angular em Nginx)
* **Backend/API:** (ex: Node.js, JSON Server)
* **Base de Dados:** (ex: PostgreSQL, MongoDB)
* **Proxy/Cache:** (ex: Redis)

Gerir cada um manualmente com `docker run` é impraticável. O Compose garante que todos arranquem na ordem certa e consigam comunicar entre si.

## 2. Redes e Comunicação Interna

O Compose cria automaticamente uma **rede interna isolada** para o projeto.

* **DNS Interno:** Os serviços comunicam entre si usando o **nome do serviço** definido no ficheiro.
* *Exemplo:* Se o serviço da API se chama `backend`, o Angular dentro da rede Docker chama `http://backend:3000`.

* **Portas (Host vs. Container):**
* **Internas:** Usadas para comunicação entre serviços dentro do Docker (ex: 3000).
* **Externas (Expostas):** Definidas em `ports`, permitem que o browser no teu computador (Host) aceda ao serviço (ex: `localhost:4200`).

## 3. Anatomia do `docker-compose.yml`

O ficheiro usa a estrutura YAML (sensível a espaços/indentação).

* **`version`**: Versão da especificação (ex: `'3.9'`).
* **`services`**: Onde definimos cada contêiner.
* **`build`**: Caminho para o Dockerfile (usa imagem local).
* **`image`**: Imagem pronta de um Registry (Docker Hub).
* **`ports`**: Mapeamento `"Host:Container"`.
* **`environment`**: Variáveis de ambiente injetadas no processo.
* **`depends_on`**: Garante a ordem de arranque (ex: a API espera pela BD).
* **`volumes`**: Persistência de dados ou sincronização de ficheiros em tempo real.
* **`restart`**: Política de reinício (ex: `always`, `unless-stopped`).
* **`healthcheck`**: Comando que verifica se o serviço está "saudável", não apenas "a correr".

### Exemplo Prático: Angular + JSON Server

```yaml
version: '3.9'
services:
  app:
    build: .
    ports:
      - "4200:80"
    depends_on:
      - api

  api:
    image: clue/json-server
    ports:
      - "3001:3000"
    volumes:
      - ./db.json:/app/db.json
    environment:
      - JSON_SERVER_WATCH=1

```

## 4. Gestão de Variáveis de Ambiente e Segredos

* **`.env`**: Lido automaticamente pelo Compose. Define valores para as variáveis usadas no YAML.
* **`.env.dev` / `.env.prod**`: Ficheiros específicos por contexto, carregados com `--env-file`.
* **Segurança:** * **NUNCA** versionar ficheiros `.env` no Git (adicionar ao `.dockerignore` e `.gitignore`).
* Versionar apenas o `.env.example` como guia.
* Para produção, usar ferramentas como **Docker Secrets**, AWS Secrets Manager ou Azure Key Vault.

## 5. Comandos Essenciais (Docker CLI V2)

O padrão atual utiliza `docker compose` (sem hífen).

* `docker compose up -d --build`: Constrói as imagens, cria a rede e sobe os serviços em **segundo plano** (detached).
* `docker compose down`: Para e remove todos os contêineres e redes (os volumes persistem, a menos que uses `-v`).
* `docker compose ps`: Lista o estado de todos os serviços do projeto.
* `docker compose logs -f [serviço]`: Segue os logs em tempo real.
* `docker compose exec [serviço] sh`: Abre um terminal dentro do contêiner em execução.
* `docker compose restart [serviço]`: Reinicia apenas um serviço específico.

## 6. Boas Práticas

1. **Um processo por contêiner:** Não mistures Frontend e Backend no mesmo serviço.
2. **Volumes para Desenvolvimento:** Montar o código local (`./`) como volume permite ver alterações sem reconstruir a imagem (Hot Reload).
3. **Imagens Leves:** Prefere sempre imagens base como `alpine`.
4. **Configuração Externa:** Usa o `.env` para mudar URLs de API sem tocar no código do Compose.

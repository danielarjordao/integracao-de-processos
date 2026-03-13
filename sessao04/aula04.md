# Aula 04 - Docker Compose

## Docker Compose

O Docker Compose é uma ferramenta que permite definir e gerenciar aplicativos multi-contêiner. Ele utiliza um arquivo YAML para configurar os serviços, redes e volumes necessários para a aplicação. Com o Docker Compose, é possível iniciar, parar e gerenciar todos os contêineres de uma aplicação com um único comando.

### Quando um contentor não é suficiente

Nem todas as aplicações podem ser executadas em um único contêiner. Muitas vezes, uma aplicação é composta por vários serviços que precisam ser executados em contêineres separados. Por exemplo, uma aplicação web pode precisar de um servidor web, um banco de dados e um cache. O Docker Compose facilita a definição e o gerenciamento desses serviços em contêineres separados.

### Redes e comunicação entre contêineres

O Docker Compose cria uma rede padrão para os serviços definidos no arquivo `docker-compose.yml`. Os contêineres podem se comunicar entre si usando os nomes dos serviços como hostnames. Isso facilita a configuração da comunicação entre os serviços, permitindo que eles se descubram e se comuniquem sem a necessidade de configurar manualmente as redes.

### Anatomia de um arquivo docker-compose.yml

O arquivo `docker-compose.yml` é o coração do Docker Compose. Ele define os serviços, redes e volumes necessários para a aplicação. A estrutura básica de um arquivo `docker-compose.yml` inclui:

- `version`: Especifica a versão do formato do arquivo Docker Compose.
- `services`: Define os serviços que compõem a aplicação. Cada serviço é configurado com uma imagem, portas, volumes e variáveis de ambiente.
  - `build`: Especifica o caminho para o Dockerfile para construir a imagem do serviço.
  - `image`: Especifica a imagem Docker a ser usada para o serviço.
  - `ports`: Define as portas que devem ser expostas pelo serviço.
  - `environment`: Define as variáveis de ambiente para o serviço.
  - `depends_on`: Especifica as dependências entre os serviços, garantindo que um serviço seja iniciado somente após outro estar em execução.
  - `volumes`: Define os volumes que devem ser montados no serviço para persistência de dados.
  - `restart`: Define a política de reinício para o serviço, como `always`, `on-failure`, ou `unless-stopped`.
  - `healthcheck`: Define um comando para verificar a saúde do serviço, garantindo que ele esteja funcionando corretamente.
- `volumes`: Define os volumes que podem ser usados pelos serviços para persistência de dados.
- `networks`: Define as redes que os serviços podem usar para se comunicar entre si.

#### Exemplo de arquivo docker-compose.yml

```yaml
version: '3'
services:
  servico1:
    image: imagem1
    ports:
      - "porta_externa:porta_interna"
    volumes:
      - volume1:/caminho/no_container
    environment:
      - VARIAVEL=valor
  servico2:
    image: imagem2
    ports:
      - "porta_externa:porta_interna"
    volumes:
      - volume2:/caminho/no_container
    environment:
      - VARIAVEL=valor
volumes:
  volume1:
  volume2:
networks:
  rede1:
```

### Variáveis de ambiente

As variáveis de ambiente são uma maneira conveniente de configurar os serviços no Docker Compose. Elas podem ser definidas diretamente no arquivo `docker-compose.yml` ou em um arquivo `.env`. As variáveis de ambiente permitem que você configure os serviços sem precisar modificar o código-fonte, facilitando a portabilidade e a reutilização dos serviços em diferentes ambientes.

- `.env`: Um arquivo que contém as variáveis de ambiente para os serviços. Ele deve estar no mesmo diretório do arquivo `docker-compose.yml` e pode ser usado para definir variáveis que serão substituídas no arquivo de configuração. Nunca deve ser versionado, pois pode conter informações sensíveis, como senhas e chaves de API.
- `.env.dev` e `.env.prod`: Arquivos de ambiente específicos para desenvolvimento e produção, permitindo que você configure os serviços de acordo com o ambiente em que estão sendo executados.
- `.env.example`: Um arquivo de exemplo que pode ser usado como modelo para criar os arquivos de ambiente reais, ajudando a documentar as variáveis necessárias para a aplicação.

### Boas práticas para o uso do Docker Compose

- Mantenha o arquivo `docker-compose.yml` organizado e legível, utilizando comentários para explicar a configuração dos serviços.
- Use variáveis de ambiente para configurar os serviços, evitando hardcoding de valores sensíveis no arquivo de configuração.
- Para segredos e informações sensíveis, utilize ferramentas de gerenciamento de segredos (como AWS Secrets Manager, HashiCorp Vault) ou Docker Secrets em vez de armazenar essas informações em arquivos de ambiente.
- Manter um serviço por contêiner para garantir a modularidade e facilitar a manutenção da aplicação.

### Comandos úteis do Docker Compose

- `docker-compose up --build`: Inicia os serviços definidos no arquivo `docker-compose.yml`, construindo as imagens se necessário.
- `docker-compose down`: Para os serviços e remove os contêineres, redes e volumes criados pelo `up`.
- `docker-compose ps`: Lista os contêineres em execução para os serviços definidos no arquivo `docker-compose.yml`.
- `docker-compose logs -f`: Exibe os logs dos serviços em tempo real.
- `docker-compose exec <servico> <comando>`: Executa um comando em um contêiner em execução para um serviço específico.
- `docker-compose restart <servico>`: Reinicia um serviço específico.

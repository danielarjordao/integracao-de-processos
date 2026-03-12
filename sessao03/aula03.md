# Aula 3 - Contentores e Virtualização

## Docker

Docker é uma plataforma de contentores que permite criar, distribuir e executar aplicações de forma consistente em qualquer ambiente. Ele isola a aplicação e suas dependências em um ambiente leve e portátil, garantindo que ela funcione da mesma maneira em desenvolvimento, teste e produção.

### Conceitos fundamentais do Docker

#### Imagem Docker

Uma imagem Docker é um pacote leve, independente e executável que inclui tudo o que é necessário para executar uma aplicação: código, runtime, bibliotecas e configurações. As imagens são criadas a partir de um arquivo chamado Dockerfile, que define as instruções para construir a imagem.

#### Contentor Docker

Um contentor Docker é uma instância em execução de uma imagem Docker. Ele é isolado do sistema host e de outros contentores, mas compartilha o kernel do host. Os contentores são efêmeros, o que significa que podem ser criados, parados e destruídos rapidamente.

#### Layers (Camadas)

As imagens Docker são construídas em camadas, onde cada camada representa uma modificação ou adição à imagem base. Isso permite que as imagens sejam reutilizadas e otimizadas, já que as camadas comuns entre diferentes imagens podem ser compartilhadas.

#### Dockerfile

Um Dockerfile é um arquivo de texto que contém uma série de instruções para construir uma imagem Docker. Ele define a base da imagem, as dependências, os arquivos a serem copiados e os comandos a serem executados quando o contentor for iniciado.

**Keywords comuns em um Dockerfile:**

* `FROM`: Especifica a imagem base para a construção da nova imagem.
* `RUN`: Executa comandos durante a construção da imagem.
* `COPY`: Copia arquivos do sistema host para a imagem.
* `CMD`: Define o comando padrão a ser executado quando o contentor for iniciado.
* `EXPOSE`: Indica quais portas o contentor irá escutar em tempo de execução.
* `WORKDIR`: Define o diretório de trabalho para os comandos subsequentes.

#### Registry

Um registry é um repositório onde as imagens Docker são armazenadas e compartilhadas. O Docker Hub é o registry público mais conhecido, mas também existem registries privados para uso corporativo.

## Virtualização

A virtualização é uma tecnologia que permite criar múltiplos ambientes virtuais em um único hardware físico. Cada ambiente virtual, ou máquina virtual, pode executar seu próprio sistema operacional e aplicações, proporcionando isolamento e flexibilidade. A virtualização é amplamente utilizada para otimizar recursos, melhorar a segurança e facilitar a gestão de infraestruturas de TI.

## Comparação entre Docker e Virtualização

| Aspecto | Docker | Virtualização |
| --- | --- | --- |
| Isolamento | Compartilha o kernel do host, mas isola a aplicação e suas dependências | Cada máquina virtual tem seu próprio kernel e sistema operacional |
| Performance | Mais leve e rápido, pois não precisa de um sistema operacional completo | Mais pesado e lento, devido à necessidade de um sistema operacional completo |
| Portabilidade | Altamente portátil, pode ser executado em qualquer ambiente | Menos portátil, depende do hypervisor e do sistema operacional |
| Uso de recursos | Utiliza menos recursos, pois compartilha o kernel do host | Utiliza mais recursos, pois cada máquina virtual precisa de seu próprio sistema operacional |
| Casos de uso | Ideal para desenvolvimento, teste e implantação de aplicações | Ideal para execução de múltiplos sistemas operacionais e isolamento completo |

## Prática: Fluxo de Trabalho com Docker

### 1. Criação do Roteiro (Dockerfile)

O arquivo funciona como um roteiro com instruções para a construção da imagem. Exemplo de ambiente base em Node.js:

```dockerfile
# Specify the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy dependency files from host to image
COPY . .

# Execute commands during the build process
RUN npm install

# Define the default command to run when the container starts
CMD ["sh"]

```

### 2. Otimização (.dockerignore)

Arquivo criado na raiz do projeto com o objetivo de impedir que o Docker copie arquivos pesados e incompatíveis, tornando a construção limpa e rápida.

```text
# Ignore local dependencies
node_modules/

# Ignore Docker configuration files
Dockerfile
.dockerignore

```

### 3. Construção da Imagem (Build)

Comando para transformar o `Dockerfile` em uma imagem (o "molde"). O ponto (`.`) no final indica o diretório atual.

```bash
# Build the image and tag it
docker build -t my-wardrobe:v1 .

```

### 4. Execução do Contentor (Run)

Comando para iniciar o contentor a partir da imagem e acessar o seu terminal de forma interativa.

```bash
# Run container interactively and assign a specific name
docker run -it --name my-wardrobe my-wardrobe:v1

```

* `-it`: Ativa o modo interativo e conecta ao terminal do contentor.
* `--name`: Atribui um nome fixo e legível ao contentor.

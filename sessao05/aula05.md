# Aula 5: Computação em Nuvem e Supabase (BaaS)

## 1. Computação em Nuvem: Modelos de Serviço

A transição do servidor físico para a cloud envolve delegar responsabilidades ao fornecedor (AWS, Azure, Google Cloud).

| Modelo | O que o Fornecedor Gere | O que o Cliente Gere | Exemplos |
| --- | --- | --- | --- |
| **IaaS** (Infrastructure) | Hardware, Redes, Virtualização. | SO, Middleware, Dados, Aplicação. | AWS EC2, Azure VMs. |
| **PaaS** (Platform) | Infraestrutura + SO + Runtime. | Dados e Aplicação (Código). | Heroku, Vercel, Railway. |
| **BaaS** (Backend) | Toda a infraestrutura de Backend e APIs. | Apenas o Frontend. | Firebase, Supabase. |
| **SaaS** (Software) | Tudo (Aplicação completa pronta a usar). | Apenas a utilização do software. | Gmail, Salesforce, Office 365. |

### Quando adotar a Cloud?

* **Vantagens:** Escalabilidade elástica (escala em minutos), Alta Disponibilidade (SLAs > 99.9%), transição de CAPEX (investimento inicial) para OPEX (custo mensal variável), velocidade de lançamento.
* **Quando NÃO usar:** Requisitos legais rígidos de localização de dados (compliance), aplicações com carga muito estável/previsível (fica mais caro que servidor próprio), ou infraestrutura local (*on-premise*) já amortizada/paga.

## 2. Backend as a Service (BaaS): Firebase vs Supabase

O BaaS é ideal para focar no desenvolvimento do produto (Frontend) sem precisar de gerir servidores ou escrever APIs do zero.

* **Firebase (Google):** Base de dados NoSQL. Fácil para estruturas simples, mas complexo para relações de dados avançadas.
* **Supabase:** Alternativa Open-Source baseada em **PostgreSQL**. Oferece SQL completo, evita *vendor lock-in* (pode ser hospedado num servidor próprio) e resolve a complexidade relacional.

## 3. Os 5 Pilares do Supabase

1. **Base de Dados:** PostgreSQL totalmente gerido. Painel visual, editor de SQL integrado, backups automáticos.
2. **Autenticação:** Ciclo completo de auth (Registo, Login, JWT). Suporta Email/Password, Magic Links e OAuth (Google, GitHub).
3. **API REST Automática:** O motor `PostgREST` lê as tabelas e cria os endpoints de API (GET, POST, PATCH, DELETE) instantaneamente, sem escrever código de backend.
4. **Storage (Armazenamento):** Gestão de ficheiros (imagens, PDFs) em *buckets* públicos ou privados.
5. **Realtime:** Subscrições em tempo real via WebSockets. Ideal para chats, notificações e dashboards dinâmicos.

## 4. Segurança e Row Level Security (RLS)

O Supabase expõe a base de dados diretamente via API. A segurança é feita na própria base de dados através do RLS.

* **O Perigo:** Sem o RLS ativo, qualquer pessoa com a chave pública pode ler, editar ou apagar toda a base de dados.
* **A Solução:** Ativar o RLS nas tabelas e criar Políticas (Policies).
* **Exemplo prático:** Combinar Auth com RLS para que um utilizador só consiga ver e editar os seus próprios registos: `auth.uid() = user_id`.

## 5. Integração com Angular (Passo a Passo)

1. **Instalação:** `npm install @supabase/supabase-js`.
2. **Configuração de Chaves (`environment.ts`):** * `SUPABASE_URL` e `SUPABASE_ANON_KEY` (Chave pública). É seguro expor a *anon_key* no frontend porque quem protege os dados é o RLS. *Atenção:* A chave `service_role` (que ignora o RLS) **nunca** deve ir para o frontend.
3. **O Serviço Angular:** Criar um `SupabaseService` injetável para encapsular o cliente e expor métodos tipados para os componentes.
4. **Consumo no Componente:** Injetar o serviço, chamar os métodos no `ngOnInit` e usar o `*ngFor` no HTML para renderizar os dados vindos do PostgreSQL.

## Leitura Complementar: Pull Request Templates no GitHub

Para manter a organização em projetos colaborativos, o GitHub permite criar templates automáticos para Pull Requests (PRs). Isso força o desenvolvedor a preencher um formulário padrão sempre que abrir um novo PR.

* **O que é:** Um ficheiro Markdown que preenche automaticamente a caixa de descrição de um PR.
* **Porquê usar:** Padroniza a comunicação da equipa, garante que o contexto da mudança é explicado, lista os passos para testar e linka as *Issues* relacionadas.
* **Como criar:**

1. Criar um ficheiro chamado `pull_request_template.md` (ou `PULL_REQUEST_TEMPLATE.md`).
2. Colocá-lo na raiz do projeto, na pasta `docs/` ou numa pasta oculta `.github/`.
3. Adicionar o formato desejado (ex: secções de "O que foi feito", "Como testar", "Checklist").

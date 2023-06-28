# **CRUD de usuários**

Essa é uma aplicação completa para operações CRUD, que permite o cadastro, autenticação, edição e exclusão de usuários. Ela foi construída com uma stack moderna e poderosa, incluindo Next.js, TypeScript, Tailwind CSS no frontend, e um servidor Node.js com TypeScript no backend. O banco de dados utilizado é o Supabase.

Veja um vídeo da aplicação funcionando:
![Demo](.github/demo.mov)

O Link para a aplicação é: **[https://crud-nextjs-nodejs-supabase.vercel.app/](https://crud-nextjs-nodejs-supabase.vercel.app/)**

## **Tecnologias Utilizadas**

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, TypeScript
- **Banco de dados**: Supabase

## **Pré-requisitos**

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: Git, Node.js, NPM ou Yarn. Além disso, é bom ter um editor para trabalhar com o código, como o VSCode.

- [Nodejs](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/)

## **Rodando o projeto**

1. **Clone o repositório**

```sh
git clone https://github.com/andreocunha/crud-nextjs-nodejs-supabase.git
```

2. **Acesse a pasta do projeto no terminal/cmd**

```sh
cd crud-nextjs-nodejs-supabase
```

Antes de executar o projeto, você deve criar um banco de dados no Supabase e configurar as variáveis de ambiente. Para isso, siga os passos abaixo:

1. **Crie uma conta no Supabase**

Acesse o site do [Supabase](https://supabase.io/) e crie uma conta. Após criar a conta, crie um novo projeto e copie a URL da API e a chave do projeto.

2. **Crie um banco de dados no Supabase**
Para criar o banco de dados veja o vídeo abaixo:

![Criando o banco de dados](.github/create_tables.mov)

O SQL usado para criar as tabelas é o seguinte:

```SQL
create extension if not exists "uuid-ossp";

create table "public"."user" (
    id uuid not null primary key,
    name TEXT NOT NULL,
    cpf TEXT NOT NULL,
    image TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);
```

Agora que já temos nosso banco de dados criado, vamos configurar o projeto.

### Para o SERVIDOR:

1. **Vá para a pasta do servidor Nodejs e baixe as dependencias**

```sh
cd backend
npm install 
```

2. **Configure as variáveis de ambiente**
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente com os valores que você copiou do seu Supabase (ambos se encontram no site do supabase na aba Settings > API):

```sh
SUPABASE_URL=https://erjxsdajadquqwllxrue.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzSijoisSasadASdazZHhqZmRxdXFwcGx4ZXVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4Nzk2OTkxMywiZXhadsdafyMDAzNTQ1OfdsfQ.k9JUf_JCebiaqqayasdZhasdasdhrogadssadas
```

3. **Para rodar o servidor Nodejs**

```sh
npm run dev
```


### Para o FRONTEND:

1. **Vá para a pasta do frontend Nextjs e baixe as dependencias**

```sh
cd frontend
npm install 
```

2. **Configure as variáveis de ambiente**
Assim como fizemos para o backend Nodejs, crie um arquivo chamado `.env.local` na raiz do projeto e adicione a seguinte variável de ambiente com o valor do seu servidor Nodejs:
```sh
NEXT_PUBLIC_SERVER_URL=http://localhost:4000/api
```

3. **Para rodar o frontend Nextjs**

```sh
npm run dev
```

Agora, abra **[http://localhost:3000](http://localhost:3000/)** com o seu navegador para ver o resultado. Você também pode começar a editar a página acessando **`pages/index.js`**.


O servidor será inicializado na porta 4000 - acesse **[http://localhost:4000](http://localhost:4000/)**

Para poder usar a tela de Admin, a senha a ser usada é `123456`.

## **Deploy na Vercel**

Essa aplicação foi deployada na Vercel e pode ser acessada através do link: **[https://crud-nextjs-nodejs-supabase.vercel.app/](https://crud-nextjs-nodejs-supabase.vercel.app/)**

## **Licença**

**[MIT](https://choosealicense.com/licenses/mit/)**
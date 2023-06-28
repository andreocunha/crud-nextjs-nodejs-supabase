# **README - Servidor de Geração e Busca de Embeddings**

Este servidor foi desenvolvido para gerar, buscar e gerenciar embeddings utilizando a biblioteca Express em Node.js e da Openai para geração dos embeddings. Além disso, ele também oferece funcionalidades para gerar respostas com base no modelo GPT. Abaixo estão os passos para executar o servidor e as rotas disponíveis.

## **Passo a passo para executar o servidor**

1. Clone o repositório do projeto em sua máquina local.
2. Navegue até a pasta do projeto e instale as dependências utilizando o comando **`npm install`**.
3. Inicie o servidor com o comando **`npm run dev`**. O servidor estará ouvindo na porta especificada no arquivo de configuração ou na porta 4000, caso não esteja especificada.

## **Rotas disponíveis**

### **GET /**

- Rota para verificar se a API está funcionando corretamente.
- Retorna um objeto JSON com a mensagem "API is up and running!" e o status 200.

### **POST /generate-embeddings**

- Rota para gerar embeddings com base no título, link, texto e ID da empresa fornecidos.
- Parâmetros necessários (JSON): **`title`**, **`link`**, **`text`** e **`company_id`**.
- Retorna um objeto JSON com a mensagem "Embeddings generated successfully" e o status 200, caso a operação seja bem-sucedida.

### **POST /search-embeddings**

- Rota para buscar embeddings com base no texto e ID da empresa fornecidos.
- Parâmetros necessários (JSON): **`text`** e **`company_id`**.
- Retorna um objeto JSON com os resultados da busca e o status 200, caso a operação seja bem-sucedida.

### **DELETE /delete-page-and-sections**

- Rota para excluir uma página e suas seções com base no caminho e ID da empresa fornecidos.
- Parâmetros necessários (JSON): **`company_id`** e **`link`**.
- Retorna um objeto JSON com a mensagem "Page and sections deleted successfully" e o status 200, caso a operação seja bem-sucedida.

### **POST /gpt-response**

- Rota para gerar respostas com base no modelo GPT utilizando o texto de prompt fornecido.
- Parâmetros necessários (JSON): **`promptText`**.
- É usado o res.write para enviar a resposta em partes, pois o modelo GPT pode demorar para gerar a resposta.

## **Como utilizar as rotas**

Utilize um cliente HTTP, como o Insomnia, para fazer requisições às rotas descritas acima. Lembre-se de enviar os parâmetros necessários no corpo da requisição no formato JSON.
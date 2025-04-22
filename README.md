# 📦 _projGerdau

---

## 🧱 Estrutura do projeto

O projeto está dividido em três partes principais:

- `front/` → Projeto Angular com a interface do sistema
- `back/` → API em Node.js com Express e Mongoose
- `bd/` → Diretório reservado para arquivos de banco de dados, como exportações ou documentações extras
- `README.md` → Este arquivo de instrução e documentação

Essa estrutura foi pensada para facilitar a organização, manutenibilidade e entendimento de quem for avaliar ou contribuir com o código.


---

## 🧾 Modelos de Dados (MongoDB/Mongoose)

A seguir estão os modelos principais utilizados no projeto, implementados com **Mongoose** para interação com o **MongoDB**.

---

### 🏢 Empresa

Modelo responsável por representar empresas cadastradas.

| Campo          | Tipo    | Obrigatório | Detalhes                        |
|----------------|---------|-------------|---------------------------------|
| `cnpj`         | String  | ✅           | Deve ser único e validado      |
| `nomeFantasia` | String  | ✅           | Nome comercial da empresa      |
| `cep`          | String  | ✅           | Validado via API externa       |
| `fornecedores` | Array   | ❌           | Referência ao modelo `Fornecedor` |

---

### 👤 Fornecedor

Modelo que representa um fornecedor, que pode ser pessoa física ou jurídica.

| Campo             | Tipo    | Obrigatório | Detalhes                                                                 |
|------------------|---------|-------------|--------------------------------------------------------------------------|
| `tipoPessoa`      | String  | ✅           | Enum: `FISICA` ou `JURIDICA`                                             |
| `cnpjCpf`         | String  | ✅           | Deve ser único                                                           |
| `nome`            | String  | ✅           | Nome do fornecedor                                                       |
| `email`           | String  | ✅           | E-mail válido                                                            |
| `cep`             | String  | ✅           | Validado via API externa                                                 |
| `rg`              | String  | Condicional | Obrigatório **apenas se** `tipoPessoa === 'FISICA'`                      |
| `dataNascimento`  | Date    | Condicional | Obrigatório **apenas se** `tipoPessoa === 'FISICA'`                      |
| `empresas`        | Array   | ❌           | Referência a múltiplas `Empresas`                                        |

---

### 🔁 Relacionamento N:N

- **Uma empresa pode ter vários fornecedores**
- **Um fornecedor pode trabalhar para várias empresas**

> Ambos os modelos mantêm referências cruzadas (`ObjectId[]`), possibilitando consultas populadas com `Mongoose.populate()`.

---

## Front-end Angular Setup

Este guia explica como configurar e executar o projeto **front-end Angular** do desafio técnico.  

### ✅ Requisitos

Você precisará das seguintes tecnologias instaladas:

### 1. [Node.js](https://nodejs.org/en)

- Recomendamos baixar a versão **LTS** (_Long Term Support_), pois é a versão mais estável e com suporte estendido.
- A instalação do Node.js também incluirá o **npm** (Node Package Manager), necessário para instalar bibliotecas.

> ⚠️ **Atenção:** após instalar, pode ser necessário configurar as variáveis de ambiente.  
> Em caso de dúvidas, consulte este vídeo:  
> [Como configurar Node.js no Windows](https://www.youtube.com/watch?v=-jft_9PlffQ)

---

### 2. Instalar o Angular CLI

Abra o terminal e execute o comando:

```bash
npm install -g @angular/cli
```

3. Para executar o front
Abra o terminal dentro da pasta /front e execute:

```bash
ng serve
```

## Back-end node Setup

Para criar o back-end com NodeJS, abra um terminal na pasta back/ e execute:

```bash
npm init -y
```
depois vamos instalar as dependencias do nosso back para possibilitar a comunicação com o banco MongoDB

```bash
npm install express mongoose dotenv axios cors
```
esse comando instala os pacotes de express, mongoose ( para conexão com o banco ), dotenv, e cors

```bash
npm install --save-dev nodemon
```
esse comando instala dependencias de desenvolviemtno local usando o MongoDB, que são os pacotes: 
Express (framework para rotas)
Mongoose (ODM para MongoDB)
Dotenv (variáveis de ambiente)
Axios (requisições HTTP)
Cors (segurança entre domínios)

Para instalar o framework de teste unitarios - jest, vamos executar o seguinte comando: 

```bash
npm install --save-dev jest supertest
```

agora vamos em nosso arquivo para package.json e vamos adicioar o scrip: 

```bash
"scripts": {
  "start": "node src/config/app.js",
  "dev": "nodemon src/config/app.js",
  "test": "jest"
},
"jest": {
  "testEnvironment": "node"
}

```

Para conseguir ver se todos os testes estão passando é necessario rodar o comando:

```bash
npm teste

```

Para ver toda a cobertura de testes de forma graficar é necessario rodar o comando: 

```bash
npm run test:coverage

```
Para ver toda a cobertura de testes vamos usar um extenção de vscode chamada "Live Server", vamos navegar ate a pasta "coverage > lcov-report > clicar com o botão direito do mouse no arquivo index.html e escolher a opção "Open with Live Server".



## Banco de dados - MongoDB

shell - o shell é a interface do MongoDB em linha de comando que serve para fazer os testes de conectividade.

para o download
https://www.mongodb.com/try/download/shell

para testar o e ver se esta funcionando basta abrir um terminal (CMD, PowerShell ou Git Bash) e digitar: 
```bash
mongosh

```

MongoDB - o MongoDB será o nosso banco de dado escolhido para o prejeto
para fazer o downloado basta clicar no link

https://www.mongodb.com/try/download/community
Durante a instalação, marque a opção de instalar o MongoDB Compass, que é a interface gráfica para visualizar e manipular os dados.

para mais detalhes de como configurar o banco de dados no contexto de cada projeto, a recomendação é ver. 
https://www.youtube.com/watch?v=vbVr1rsPHCU&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=3


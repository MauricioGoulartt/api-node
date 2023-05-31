# Api-NodeJS

# API de Autenticação

Esta API foi criada para gerenciar a autenticação de usuários de um aplicativo. Ela usa a autenticação baseada em token JWT e oferece endpoints para registrar um novo usuário, fazer login e obter informações do usuário autenticado.

- ipv4 público: 18.231.156.186
- PORT: 3333

atualmente executando na AWS ec2

## Tecnologias Usadas

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
* [dotenv](https://github.com/motdotla/dotenv)
* [body-parser](https://github.com/expressjs/body-parser)
* [eslint](https://github.com/eslint/eslint)

## Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Você tem uma máquina `Windows/Linux/Mac` com uma versão recente do `Node.js` instalada.

## Como executar

Para instalar e usar esta API, siga os seguintes passos:

1. Faça um clone deste repositório.
2. Acesse a pasta do projeto no terminal/cmd.
3. Instale as dependências com `npm install`.
4. Execute o servidor com `npm start`.
5. Acesse as rotas através de `(http://18.231.156.186:3333/)`.

## Rotas da API

### POST /signup

Cria um novo usuário.

- Request body: 

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "userpassword",
  "telephones": [{"number": 123456789, "area_code": 11}]
}
```

### POST /signin

Autentica um usuário existente e retorna um token JWT.

```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

### GET /user
Retorna as informações do usuário autenticado.

- Request headers:

- Authorization: Bearer <JWT_TOKEN>


### Contribuição
Se você quiser contribuir, por favor faça um fork do projeto e crie um pull request.

### Contato
Se você quiser entrar em contato comigo, pode me encontrar em <mauriciogoulart.1990@gmail.com>.

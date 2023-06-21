# Boas-vindas ao repositório do projeto Talker Manager


<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary>

   Neste projeto você encontrará uma aplicação de cadastro de talkers (palestrantes) em que será possível cadastrar, visualizar, pesquisar, editar e excluir informações. Para isso foi desenvolvido:

  1. Uma API de um `CRUD` (**C**reate, **R**ead, **U**pdate e **D**elete) de palestrantes (talkers) e;
  2. Endpoints que lêem e escrevem em um arquivo utilizando o módulo `fs`.

<br />
</details>

<br />

# Orientações

## Orientações

<details>
<summary> 🐳 Início rápido com Docker</summary><br>

```bash
# em um terminal, inicie os containers
docker-compose up -d

# acesse o terminal do container inicie a aplicação
docker exec -it talker_manager bash
npm start
# ou para iniciar com live-reload
npm run dev

</details>

<details>
<summary>🖥️ Início rápido sem Docker</summary><br>

>
> Crie um arquivo `.env` na raiz do projeto seguindo o padrão do arquivo [`env.example`](./env.example) e o modifique de acordo com a necessidade.
>

```bash
# em um terminal, inicie a aplicação no container
npm install
env $(cat .env) npm start
# ou para iniciar com live-reload
env $(cat .env) npm run dev

</details>

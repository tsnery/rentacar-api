# rentacar

A project the helps you to organize and manage info about cars.

It is also a project that was made in order to learn backend development using NodeJS.

## This project taught me:

- Swagger, to create the project documentation
- Node Streams, a performatic way to handle with reading data
- Multer, to work with multipart data, i.e CSV file
- SOLID concepts, to write a readable code
- TypeORM
- JSON Web Token
- Swagger for documentation
- Postgresql

# Coleta de requisitos

## Cadastro de carro

**Requisito Funcional**

- Deve ser possível cadastrar um novo carro
- Deve ser possível listar todas as categorias

**Regra de negócio**

- Não deve ser possível cadastrar um carro com uma placa já existente
- O carro deve ser cadastrada, por padrão, com disponibilidade
- O usuário responsável pelo cadastro deve ser um usuário administrador

## Listagem de carros

**Requisito Funcional**

- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros pelo nome da categoria
- Deve ser possível listar todos os carros pelo nome da marca
- Deve ser possível listar todos os carros pelo nome do carro

**Regra de negócio**

- O usuário não precisa estar logado no sistema

## Cadastro de especifição no carro

**Requsitio funcional**

- Deve ser possível cadastrar uma especificação para um carro

**Regra de negócio**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- Não deve ser possível uma especificação já existente para o mesmo carro
- O usuário responsável pelo cadastro deve ser um usuário administrador

## Cadastro de imagens do carro

**Requsitio funcional**

- Deve ser possível cadastrar a imagem do carro

**Requisito não-funcional**

- Utilizar o multer para o upload dos arquivos

**Regra de negócio**

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- O usuário responsável pelo cadastro deve ser um usuário administrador

# Aluguel de carro

**Requisito funcional**

- Deve ser possível cadastrar um aluguel

**Regra de negócio**

- O alugel deve ter duração mínima de 24h
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
- O usuário deve estar logado na aplicação
- Ao realizar aluguel, o status do carro deverá ser definido para indisponível

# Decolução de carro

- Se o carro for devolvido com menos de 24h, deverá ser cobrada diária completa
- Ao realizar devolução, deverá ser calculado o total do aluguel
- Ao realizar devolução, o carro deverá ser liberado para outro aluguel
- Ao realizar devolução, o usuário deverá ser liberado para outro aluguel
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso
- Caso haja multa, deverá ser somado ao total do aluguel

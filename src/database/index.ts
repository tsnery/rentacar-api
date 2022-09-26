import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "rentacar",
  password: "rentacarpassword",
  database: "rentacar",
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
})

AppDataSource.initialize()
  .then(() => console.info('Database initialized!'))
  .catch(error => console.log(error))
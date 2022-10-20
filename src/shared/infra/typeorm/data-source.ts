import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "rentacar",
  password: "rentacarpassword",
  database: "rentacar",
  logging: false,
  entities: ["modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["shared/infra/typeorm/migrations/*.ts"],
  subscribers: [],
})
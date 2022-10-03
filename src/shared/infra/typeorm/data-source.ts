import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "rentacar",
  password: "rentacarpassword",
  database: "rentacar",
  logging: false,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/*.ts"],
  subscribers: [],
})
import { DataSource } from "typeorm"
import { AppDataSource } from "./data-source"

export const initializeDatabase = (): Promise<DataSource> => {
  return AppDataSource.setOptions({
    host: 'pg_rentacar',
  }).initialize()
}
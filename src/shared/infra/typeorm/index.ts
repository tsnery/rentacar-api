import { DataSource, DataSourceOptions } from "typeorm"
import { AppDataSource } from "./data-source"

type IDBOptions = DataSourceOptions & {
  host: string
  database: string
}

type TEnviroment = {
  test: string
  dev: string
}

type TDefaults = {
  [key in keyof TEnviroment]: {
    database: string
    host: string
  }
}

export const initializeDatabase = (): Promise<DataSource> => {
  const dbOptions = AppDataSource.options as IDBOptions

  const environment: keyof TEnviroment = process.env.NODE_ENV as keyof TEnviroment || 'dev'

  const defaults: TDefaults = {
    test: {
      database: 'rentacar_test',
      host: 'localhost'
    },
    dev: {
      database: dbOptions.database,
      host: 'pg_rentacar'
    }
  }

  return AppDataSource.setOptions({
    host: defaults[environment].host,
    database: defaults[environment].database
  }).initialize()
}
import { AppDataSource } from "../data-source"
import { v4 as uuidV4 } from 'uuid'
import { hash } from "bcryptjs"

async function getConnection() {
  return AppDataSource.initialize()
}

async function create() {
  const connection = getConnection()

  const id = uuidV4()
  const password = await hash('admin', 8)

  await (await connection).query(
    `INSERT INTO USERS(id, name, email, driver_license, password, is_admin, created_at)
    VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [id, 'Tainan Admin', 'admin@email.com', '123123', password, true, new Date()]
  )

  await (await connection).destroy()
}

create().then(() => console.log('User admin created!'))
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { randomUUID } from 'node:crypto'

@Entity('users')
class User {
  @PrimaryColumn('varchar')
  id?: string

  @Column('varchar')
  name!: string

  @Column('varchar')
  email!: string

  @Column('varchar')
  password!: string

  @Column('varchar')
  driver_license!: string

  @Column('bool')
  is_admin!: boolean

  @Column('varchar')
  avatar?: string

  @CreateDateColumn()
  created_at!: Date

  constructor() {
    if (!this.id) {
      this.id = randomUUID()
    }
  }
}

export { User }
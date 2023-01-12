import { randomUUID } from 'node:crypto'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryColumn } from "typeorm";
import { User } from "./User";
// import { User } from './User'

@Entity('users_tokens')
class UsersTokens {
  @PrimaryColumn('varchar')
  id!: string;

  @Column('varchar')
  refresh_token!: string

  @Column('varchar')
  user_id!: string

  @ManyToMany(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @Column('timestamp')
  expires_date!: Date

  @CreateDateColumn()
  created_at!: Date;

  constructor () {
    if (!this.id) {
      this.id = randomUUID()
    }
  }
}

export { UsersTokens }
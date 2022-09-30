import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('categories')
export class Category {
  @PrimaryColumn('varchar')
  id?: string

  @Column('varchar')
  name!: string

  @Column('varchar')
  description!: string

  @CreateDateColumn()
  created_at!: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
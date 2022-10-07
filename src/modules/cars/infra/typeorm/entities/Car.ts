import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { Category } from './Category'
import { Specification } from './Specification'

@Entity('cars')
export class Car {
  @PrimaryColumn('uuid')
  id?: string

  @Column('varchar')
  name!: string

  @Column('varchar')
  description!: string

  @Column('numeric')
  daily_rate!: number

  @Column('boolean')
  is_available = true

  @Column('varchar')
  license_plate!: string

  @Column('numeric')
  fine_amount!: number

  @Column('varchar')
  brand!: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category!: Category

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumn: { name: 'card_id' },
    inverseJoinColumn: { name: 'specification_id' }
  })
  specifications!: Specification[]

  @Column('uuid')
  category_id!: string

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
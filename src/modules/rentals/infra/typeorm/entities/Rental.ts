import { Car } from "@modules/cars/infra/typeorm/entities/Car"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"

@Entity('rentals')
export class Rental {
  @PrimaryColumn('uuid')
  id!: string

  @Column('uuid')
  car_id!: string

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car!: Car;

  @Column('uuid')
  user_id!: string

  @Column('timestamp with time zone')
  start_date!: Date

  @Column('timestamp with time zone')
  end_date!: Date

  @Column('timestamp with time zone')
  expected_return_date!: Date

  @Column('numeric')
  total!: number

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
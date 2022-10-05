import { v4 as uuidV4 } from 'uuid'

export class Car {
  id?: string
  name!: string
  description!: string
  daily_rate!: number
  is_available!: boolean
  license_plate!: string
  fine_amount!: number
  brand!: string
  created_at!: Date
  updated_at!: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
      this.is_available = true
      this.created_at = new Date()
    }
  }
}
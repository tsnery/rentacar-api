import { ICreateRentalDTO } from "../dtos/ICreateRental.dto"
import { Rental } from "../infra/typeorm/entities/Rental"

export interface IRentalRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental | null>
  findOpenRentalByUser(user_id: string): Promise<Rental | null>
  findById(id: string): Promise<Rental | null>
  findByUser(user_id: string): Promise<Rental[]>
  create({ car_id, expected_return_date, user_id, end_date, id, total }: ICreateRentalDTO): Promise<Rental>
}
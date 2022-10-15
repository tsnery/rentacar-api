import { ICreateRentalDTO } from "../dtos/ICreateRental.dto"
import { Rental } from "../infra/typeorm/entities/Rental"

export interface IRentalRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental | null>
  findOpenRentalByUser(user_id: string): Promise<Rental | null>
  create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental>
}
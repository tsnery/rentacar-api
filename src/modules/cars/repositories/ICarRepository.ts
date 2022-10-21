import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface IFindAvailableProps {
  category_id: string
  brand: string
  name: string
}

export interface ICarRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLincesePlate(license_plate: string): Promise<Car | null>
  findAvailable({ name, brand, category_id }: Partial<IFindAvailableProps>): Promise<Car[]>
  findById(car_id: string): Promise<Car | null>
  updateAvailability(id: string, availability: boolean): Promise<void>
}
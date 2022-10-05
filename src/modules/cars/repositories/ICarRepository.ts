import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarRepository {
  create(data: ICreateCarDTO): Promise<void>
  findByLincesePlate(license_plate: string): Promise<Car | null>
}
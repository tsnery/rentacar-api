import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { IListCarsRequest } from "./listCars.types";

export class ListCarsUseCase {
  constructor(private carRepository: ICarRepository) { }

  async execute({ brand, category_id, name }: Partial<IListCarsRequest>): Promise<Car[]> {
    const cars = await this.carRepository.findAvailable({ brand, category_id, name })

    return cars
  }
}
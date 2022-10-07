import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { AppError } from "@shared/errors/AppError";
import { ICreateCarSpecificationRequest } from "./createCarSpecification.types";

export class CreateCarSpecificationUseCase {
  constructor(private carRepository: ICarRepository) { }

  async execute({ car_id, specifications_id }: ICreateCarSpecificationRequest): Promise<void> {
    const carExists = await this.carRepository.findById(car_id)

    if (!carExists) {
      throw new AppError('Car does not exists!')
    }

  }
}
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { ICreateCarSpecificationRequest } from "./createCarSpecification.types";

export class CreateCarSpecificationUseCase {
  constructor(
    private carRepository: ICarRepository,
    private specificationRepository: ISpecificationRepository
  ) { }

  async execute({ car_id, specifications_id }: ICreateCarSpecificationRequest): Promise<void> {
    const carExists = await this.carRepository.findById(car_id)

    if (!carExists) {
      throw new AppError('Car does not exists!')
    }

    const specifications = await this.specificationRepository.findByIds(specifications_id)

    carExists.specifications = specifications

    await this.carRepository.create(carExists)

    console.log('carExists', carExists)
  }
}
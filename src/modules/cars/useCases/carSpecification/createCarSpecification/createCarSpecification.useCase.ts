import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateCarSpecificationRequest } from "./createCarSpecification.types";

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,

    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) { }

  async execute({ car_id, specifications_id }: ICreateCarSpecificationRequest): Promise<Car> {
    const carExists = await this.carRepository.findById(car_id)

    if (!carExists) {
      throw new AppError('Car does not exists!')
    }

    const specifications = await this.specificationRepository.findByIds(specifications_id)

    carExists.specifications = specifications

    await this.carRepository.create(carExists)

    return carExists
  }
}
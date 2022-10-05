import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateCarRequest } from "./createCar.types";

// @injectable()
export class CreateCarUseCase {
  constructor(
    // @inject('CarRepository') 
    private carRepository: ICarRepository
  ) { }

  async execute({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate
  }: ICreateCarRequest): Promise<void> {

    const carAlreadyExists = await this.carRepository.findByLincesePlate(license_plate)

    if (carAlreadyExists) {
      throw new AppError('Car already exists!')
    }

    await this.carRepository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate
    })
  }
}
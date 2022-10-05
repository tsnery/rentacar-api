import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { inject } from "tsyringe";
import { Repository } from "typeorm";
import { Car } from "../../entities/Car";

export class CarRepository implements ICarRepository {

  private repository: Repository<Car>

  constructor() {
    this.repository = AppDataSource.getRepository(Car)
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    })

    await this.repository.save(car)

    return car
  }

  async findByLincesePlate(license_plate: string): Promise<Car | null> {
    const car = await this.repository.findOne({ where: { license_plate } })

    return car
  }

}
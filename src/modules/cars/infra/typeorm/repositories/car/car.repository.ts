import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository, IFindAvailableProps } from "@modules/cars/repositories/ICarRepository";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
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
    name,
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id
    })

    await this.repository.save(car)

    return car
  }

  async findByLincesePlate(license_plate: string): Promise<Car | null> {
    const car = await this.repository.findOne({ where: { license_plate } })

    return car
  }

  async findAvailable({ name, brand, category_id }: Partial<IFindAvailableProps>): Promise<Car[]> {
    const carsQuery = this.repository.createQueryBuilder('c')
      .where("is_available = :is_available", { is_available: true })

    if (brand) carsQuery.andWhere("c.brand = :brand", { brand })
    if (name) carsQuery.andWhere("c.name = :name", { name })
    if (category_id) carsQuery.andWhere("c.category_id = :category_id", { category_id })

    const cars = await carsQuery.getMany()

    return cars
  }

  async findById(car_id: string): Promise<Car | null> {
    return await this.repository.findOne({ where: { id: car_id } })
  }

  async updateAvailability(id: string, availability: boolean): Promise<void> {
    this.repository.createQueryBuilder()
      .update()
      .set({ is_available: availability })
      .where("id = :id")
      .setParameters({ id })
      .execute()
  }
}
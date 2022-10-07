import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { isObjectEmpty } from "@utils/isObjectEmpty";
import { ICarRepository, IFindAvailableProps } from "../ICarRepository";

export class CarRepositoryInMemory implements ICarRepository {
  cars: Car[] = []

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    })

    this.cars.push(car)

    return car
  }

  async findByLincesePlate(license_plate: string): Promise<Car | null> {
    const car = this.cars.find(car => car.license_plate === license_plate) || null

    return car
  }

  async findAvailable(searchParams: IFindAvailableProps): Promise<Car[]> {
    const availablesCars = this.cars.filter(car => car.is_available)

    if (isObjectEmpty(searchParams)) {
      return availablesCars
    }

    const filteredCars = availablesCars.filter(car => {
      if (searchParams.brand && car.brand === searchParams.brand) {
        return car
      } else if (searchParams.category_id && searchParams.category_id === car.category_id) {
        return car
      } else if (searchParams.name && car.name === searchParams.name) {
        return car
      } else {
        return null
      }
    })

    return filteredCars
  }

  async findById(car_id: string): Promise<Car | null> {
    return this.cars.find(car => car.id === car_id) || null
  }

}
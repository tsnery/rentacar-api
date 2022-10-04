import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarInMemory.repository";
import { beforeEach, describe, it } from "vitest";
import { ICreateCarRequest } from "./createCar.types";
import { CreateCarUseCase } from "./createCar.useCase";

let createCarUseCase: CreateCarUseCase
let carRepository: CarRepositoryInMemory

describe('Create a car', () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carRepository)
  })

  it('should create a new car', async () => {

    const newCar: ICreateCarRequest = {
      name: 'Teste name',
      brand: 'Teste brand',
      daily_rate: 1,
      description: 'Teste description',
      fine_amount: 10,
      license_plate: 'asdasdasd',
      category_id: 'teste'
    }

    await createCarUseCase.execute(newCar)
  })
})
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarInMemory.repository";
import { AppError } from "@shared/errors/AppError";
import { beforeEach, describe, expect, it } from "vitest";
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

  it('should not be able to create a car with a existing license plate', async () => {
    await expect(async () => {
      const car1: ICreateCarRequest = {
        name: 'Teste name',
        brand: 'Teste brand',
        daily_rate: 1,
        description: 'Teste description',
        fine_amount: 10,
        license_plate: 'asdasdasd',
        category_id: 'teste'
      }

      await createCarUseCase.execute(car1)

      const car2: ICreateCarRequest = {
        name: 'Teste name',
        brand: 'Teste brand',
        daily_rate: 1,
        description: 'Teste description',
        fine_amount: 10,
        license_plate: 'asdasdasd',
        category_id: 'teste'
      }

      await createCarUseCase.execute(car2)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to create a car with is_avaible true by default', async () => {
    const car1: ICreateCarRequest = {
      name: 'Teste name',
      brand: 'Teste brand',
      daily_rate: 1,
      description: 'Teste description',
      fine_amount: 10,
      license_plate: 'asdasdasd',
      category_id: 'teste'
    }

    const newCar = await createCarUseCase.execute(car1)

    expect(newCar.is_available).toBe(true)
  })
})
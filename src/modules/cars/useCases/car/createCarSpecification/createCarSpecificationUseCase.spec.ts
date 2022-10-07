import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarInMemory.repository";
import { AppError } from "@shared/errors/AppError";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateCarSpecificationUseCase } from "./createCarSpecification.useCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carRepository: CarRepositoryInMemory

describe('Create Car Specification', () => {

  beforeEach(() => {
    carRepository = new CarRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carRepository)
  })

  it('should not be able to add a new specification to the non-existent car', async () => {
    await expect(async () => {
      const car_id = '123'
      const specifications = ['123123']
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id: specifications
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to add a new specification to a car', async () => {
    const car = await carRepository.create({
      name: 'Teste name',
      brand: 'Teste brand',
      daily_rate: 1,
      description: 'Teste description',
      fine_amount: 10,
      license_plate: 'asdasdasd',
      category_id: 'teste'
    })

    const specifications_id = ['123123']

    await createCarSpecificationUseCase.execute({
      car_id: car.id!,
      specifications_id: specifications_id
    })
  })
})
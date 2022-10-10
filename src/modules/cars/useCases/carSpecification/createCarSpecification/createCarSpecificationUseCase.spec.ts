import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarInMemory.repository";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/specificationInMemory.repository";
import { AppError } from "@shared/errors/AppError";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateCarSpecificationUseCase } from "./createCarSpecification.useCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carRepository: CarRepositoryInMemory
let specificationRepositroyInMemory: SpecificationRepositoryInMemory

describe('Create Car Specification', () => {

  beforeEach(() => {
    carRepository = new CarRepositoryInMemory()
    specificationRepositroyInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carRepository, specificationRepositroyInMemory)
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

    const specification = await specificationRepositroyInMemory.create({
      description: 'test',
      name: 'test'
    })

    const specifications_id = [specification.id]

    const specificationCar = await createCarSpecificationUseCase.execute({
      car_id: car.id!,
      specifications_id: specifications_id
    })

    expect(specificationCar).toHaveProperty('specifications')
    expect(specificationCar.specifications.length).toBe(1)
  })
})
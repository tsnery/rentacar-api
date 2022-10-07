import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarInMemory.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateCarUseCase } from "../createCar/createCar.useCase";
import { ListCarsUseCase } from "./listCars.useCase";

let createCarUseCase: CreateCarUseCase
let listCarsUseCase: ListCarsUseCase
let carRepository: CarRepositoryInMemory

describe('List availables cars', () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carRepository)
    listCarsUseCase = new ListCarsUseCase(carRepository)
  })

  it('should list only available cars', async () => {
    const newCar = await createCarUseCase.execute({
      name: "Audi",
      description: "Carro bonito",
      daily_rate: 140.00,
      license_plate: "ABC-1212",
      fine_amount: 100,
      brand: "Audi",
      category_id: "fc064e81-85c5-49cb-ab6f-4a56e26faa04"
    })

    const cars = await listCarsUseCase.execute({})
    console.log('CARS', cars)
    expect(cars).toEqual([newCar])
  })

  it('should list all available cars by name', async () => {
    const newCar = await createCarUseCase.execute({
      name: "Audi",
      description: "Carro bonito",
      daily_rate: 140.00,
      license_plate: "ABC-1212",
      fine_amount: 100,
      brand: "Audi",
      category_id: "fc064e81-85c5-49cb-ab6f-4a56e26faa04"
    })

    const newCar2 = await createCarUseCase.execute({
      name: "Teste",
      description: "Carro bonito",
      daily_rate: 140.00,
      license_plate: "ABC-2121",
      fine_amount: 100,
      brand: "Audi",
      category_id: "fc064e81-85c5-49cb-ab6f-4a56e26faa04"
    })

    const cars = await listCarsUseCase.execute({ name: 'Audi' })

    expect(cars).length(1)
  })

  it('should list all available cars by brand', async () => {
    const newCar = await createCarUseCase.execute({
      name: "Audi",
      description: "Carro bonito",
      daily_rate: 140.00,
      license_plate: "ABC-1212",
      fine_amount: 100,
      brand: "Audi",
      category_id: "fc064e81-85c5-49cb-ab6f-4a56e26faa04"
    })

    const newCar2 = await createCarUseCase.execute({
      name: "Teste",
      description: "Carro bonito",
      daily_rate: 140.00,
      license_plate: "ABC-2121",
      fine_amount: 100,
      brand: "Audi",
      category_id: "fc064e81-85c5-49cb-ab6f-4a56e26faa04"
    })

    const cars = await listCarsUseCase.execute({ brand: 'Audi' })

    expect(cars).length(2)
  })

  it('should list all available cars by name', async () => {
    const newCar = await createCarUseCase.execute({
      name: "Audi",
      description: "Carro bonito",
      daily_rate: 140.00,
      license_plate: "ABC-1212",
      fine_amount: 100,
      brand: "Audi",
      category_id: "fc064e81-85c5-49cb-ab6f-4a56e26faa04"
    })

    const newCar2 = await createCarUseCase.execute({
      name: "Teste",
      description: "Carro bonito",
      daily_rate: 140.00,
      license_plate: "ABC-2121",
      fine_amount: 100,
      brand: "Audi",
      category_id: "fc064e81-85c5-49cb-ab6f-4a56e26faa04"
    })

    const cars = await listCarsUseCase.execute({ category_id: 'fc064e81-85c5-49cb-ab6f-4a56e26faa04' })

    expect(cars).length(2)
  })
})
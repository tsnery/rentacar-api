import dayjs from 'dayjs'
import { beforeEach, describe, expect, it } from "vitest";

import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/rentalInMemory.repository";
import { DayJSProvider } from '@shared/providers/dateProvider/implementations/dayjs.provider';
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./createRental.usecase";
import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarInMemory.repository';

let createRentalUseCase: CreateRentalUseCase
let rentalRepository: RentalRepositoryInMemory
let carRepository: CarRepositoryInMemory

let dayjsDateProvider: DayJSProvider

describe('Create Rental', () => {
  const dayAfter24Hours = dayjs().add(1, 'day').toDate()
  const dayBefore24Hours = dayjs().add(23, 'hours').toDate()
  beforeEach(() => {
    dayjsDateProvider = new DayJSProvider()
    rentalRepository = new RentalRepositoryInMemory()
    carRepository = new CarRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalRepository, dayjsDateProvider, carRepository)
  })

  it('should be able to create a new rental', async () => {
    const car = await carRepository.create({
      name: 'Car test',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'TEST',
      fine_amount: 40,
      category_id: '1234',
      brand: 'BRAND',
    })
    
    const rental = await createRentalUseCase.execute({
      user_id: '123',
      car_id: car.id!,
      expected_return_date: dayAfter24Hours,
    })
    
    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await rentalRepository.create({
      car_id: "111",
      expected_return_date: dayAfter24Hours,
      user_id: "123"
    })
    
    await expect(createRentalUseCase.execute({
        user_id: '123',
        car_id: '456',
        expected_return_date: dayAfter24Hours,
      })
    ).rejects.toEqual(new AppError("User already has a rental in progress!"))
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalRepository.create({
      user_id: '123123',
      car_id: '456',
      expected_return_date: dayAfter24Hours,
    })

    await expect(createRentalUseCase.execute({
        user_id: '123',
        car_id: '456',
        expected_return_date: dayAfter24Hours,
      })
    ).rejects.toEqual(new AppError("Car is not available!"))
  })

  it('should not be able to create a new rental if expected return date be minus than 24h', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '321',
        car_id: '456',
        expected_return_date: dayBefore24Hours,
      })
    }).rejects.toEqual(new AppError("Rental must be at least 24h of the return date"))
  })

})
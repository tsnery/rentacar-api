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
    const rental = await createRentalUseCase.execute({
      user_id: '123',
      car_id: '456',
      expected_return_date: dayAfter24Hours,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '456',
        expected_return_date: dayAfter24Hours,
      })

      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '456',
        expected_return_date: dayAfter24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '321',
        car_id: '456',
        expected_return_date: dayAfter24Hours,
      })

      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '456',
        expected_return_date: dayAfter24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if expected return date be minus than 24h', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        user_id: '321',
        car_id: '456',
        expected_return_date: dayBefore24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

})
import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository.types";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/dateProvider/dateProvider.types";
import { IDevolutionRentalRequest } from "./devolutionRental.types";

@injectable()
export class DevolutionRentalUseCase {

  constructor(
    @inject('RentalRepository') private rentalRepository: IRentalRepository,
    @inject('CarRepository') private carRepository: ICarRepository,
    @inject('DateProvider') private dateProviter: IDateProvider
  ) { }

  async execute({ id, user_id }: IDevolutionRentalRequest): Promise<Rental> {
    const rental = await this.rentalRepository.findById(id)
    const car = await this.carRepository.findById(rental!.car_id)

    if (!car) {
      throw new Error('Car do not exists!')
    }

    const MINIMUM_DAILY: number = 1

    if (!rental) {
      throw new AppError('Rental do not exists!')
    }

    const dateNow = this.dateProviter.dateNow()

    let daily = this.dateProviter.compareInDays(
      rental.start_date,
      dateNow
    )

    if (daily <= 0) {
      daily = MINIMUM_DAILY
    }

    const delay = this.dateProviter.compareInDays(
      dateNow,
      rental.expected_return_date
    )

    let total: number = 0

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount
      total = calculate_fine
    }

    total += daily * car.daily_rate

    rental.end_date = this.dateProviter.dateNow()
    rental.total = total

    await this.rentalRepository.create(rental)
    await this.carRepository.updateAvailability(String(car.id), true)

    return rental
  }
}
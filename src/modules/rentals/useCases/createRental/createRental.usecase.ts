import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository.types";
import { AppError } from "@shared/errors/AppError";
import { ICreateRentalRequest } from "./createRental.types";
import { IDateProvider } from "@shared/providers/dateProvider/dateProvider.types";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) { }

  async execute({ car_id, user_id, expected_return_date }: ICreateRentalRequest): Promise<Rental> {

    const MINIMUM_HOUR = 24

    const carNotAvailable = await this.rentalRepository.findOpenRentalByCar(car_id)

    if (carNotAvailable) {
      throw new AppError('Car is not available!')
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new AppError('User already has a rental in progress!')
    }

    const dateNow = this.dateProvider.dateNow()
    const compare = this.dateProvider.compareInHours(expected_return_date, dateNow)

    if (compare < MINIMUM_HOUR) {
      throw new AppError('Rental must be at least 24h of the return date')
    }

    const rental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    return rental
  }
}
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository.types";
import { AppError } from "@shared/errors/AppError";
import { ICreateRentalRequest } from "./createRental.types";

dayjs.extend(utc)

export class CreateRentalUseCase {

  constructor(private rentalRepository: IRentalRepository) { }

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

    const rental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    const dateNow = dayjs().utc().local().format()
    const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format()
    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, 'hours')

    if (compare < MINIMUM_HOUR) {
      throw new AppError('Rental must be at least 24h of the return date')
    }

    return rental
  }
}
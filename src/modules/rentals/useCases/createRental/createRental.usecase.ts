import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository.types";
import { AppError } from "@shared/errors/AppError";
import { ICreateRentalRequest } from "./createRental.types";

export class CreateRentalUseCase {

  constructor(private rentalRepository: IRentalRepository) { }

  async execute({ car_id, user_id, expected_return_date }: ICreateRentalRequest): Promise<Rental> {
    const carNotAvailable = await this.rentalRepository.findOpenRentalByCar(car_id)

    if (carNotAvailable) {
      throw new AppError('Car is not available!')
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new Error('User already has a rental in progress!')
    }

    const rental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    return rental
  }
}
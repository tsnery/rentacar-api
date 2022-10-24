import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRental.dto";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository.types";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";
import { Rental } from "../entities/Rental";

export class RentalRepository implements IRentalRepository {

  private repository: Repository<Rental>

  constructor() {
    this.repository = AppDataSource.getRepository(Rental)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    const openByCar = await this.repository.findOne({ where: { car_id } })

    return openByCar
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    const openByUser = await this.repository.findOne({ where: { user_id } })

    return openByUser
  }
  async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    })

    await this.repository.save(rental)

    return rental
  }

  async findById(id: string): Promise<Rental | null> {
    const rental = await this.repository.findOneBy({ id })

    return rental
  }
}
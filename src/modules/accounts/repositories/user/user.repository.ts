import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { User } from "../../entities/User";
import { ICreateUserDTO, IUserRepository } from "./user.types";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create({ name, email, password, driver_license, username }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      username
    })

    await this.repository.save(user)
  }
}
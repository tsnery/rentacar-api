import { Repository } from "typeorm";

import { User } from './../../entities/User';
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { ICreateUserDTO, IUserRepository } from "./user.types";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create({ name, email, password, driver_license, avatar, id }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id
    })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } })

    return user
  }

  async findById(user_id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id: user_id } })

    return user
  }
}
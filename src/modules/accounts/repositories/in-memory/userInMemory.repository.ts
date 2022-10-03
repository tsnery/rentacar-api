import { User } from './../../infra/typeorm/entities/User';
import { ICreateUserDTO, IUserRepository } from "../../infra/typeorm/repositories/user/user.types";

export class UserRepositoryInMemory implements IUserRepository {

  users: User[] = []

  async create({ name, email, driver_license, password, avatar, id }: ICreateUserDTO): Promise<void> {
    const newUser: User = new User()

    Object.assign(newUser, {
      name,
      email,
      driver_license,
      password,
      avatar,
      id
    })

    this.users.push(newUser)
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email) || null

    return user
  }
  async findById(user_id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === user_id) || null

    return user
  }

}
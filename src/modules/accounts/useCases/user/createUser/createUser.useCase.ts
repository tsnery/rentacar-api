import { inject, injectable } from "tsyringe";
import { ICreateUserDTO, IUserRepository } from "../../../repositories/user/user.types";

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) { }

  async execute({ name, username, email, password, driver_license }: ICreateUserDTO): Promise<void> {
    return this.userRepository.create({
      driver_license,
      email,
      name,
      password,
      username
    })
  }
}
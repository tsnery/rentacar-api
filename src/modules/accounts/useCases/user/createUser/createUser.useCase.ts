import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO, IUserRepository } from "../../../repositories/user/user.types";

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) { }

  async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {

    const passwordHash = await hash(password, 8)

    return this.userRepository.create({
      driver_license,
      email,
      name,
      password: passwordHash
    })
  }
}
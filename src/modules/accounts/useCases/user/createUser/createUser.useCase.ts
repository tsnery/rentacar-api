import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../errors/AppError";
import { ICreateUserDTO, IUserRepository } from "../../../repositories/user/user.types";

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) { }

  async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('This email is already been used')
    }

    const passwordHash = await hash(password, 8)

    return this.userRepository.create({
      driver_license,
      email,
      name,
      password: passwordHash
    })
  }
}
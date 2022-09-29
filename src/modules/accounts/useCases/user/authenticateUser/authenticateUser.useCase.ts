import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../errors/AppError";
import { IUserRepository } from "../../../repositories/user/user.types";
import { IAuthenticateUserRequest, IAuthenticateUserResponse } from "./authenticateUser.types";

@injectable()
export class AuthenticateUserUseCase {

  constructor(@inject('UserRepository') private userRepository: IUserRepository) { }

  async execute({ email, password }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const token = sign({}, "71547b2ff2302aed12b2e3c673304e02", {
      subject: user.id,
      expiresIn: "1d"
    })

    const authenticationReturn: IAuthenticateUserResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return authenticationReturn
  }
}
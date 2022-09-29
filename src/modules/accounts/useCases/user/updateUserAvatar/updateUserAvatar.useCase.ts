import { inject, injectable } from "tsyringe";
import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/user/user.types";
import { IUpdateUserAvatarRequest } from "./updateUserAvatar.types";

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) { }

  async execute({ avatar_file, user_id }: IUpdateUserAvatarRequest): Promise<void> {

    if (!avatar_file) {
      throw new Error('File not found! Please, try again.')
    }

    const user = await this.userRepository.findById(user_id) as User

    user.avatar = avatar_file

    await this.userRepository.create(user)
  }
}
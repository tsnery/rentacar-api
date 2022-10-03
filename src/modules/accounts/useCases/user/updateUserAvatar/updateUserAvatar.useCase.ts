import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/infra/typeorm/repositories/user/user.types";
import { deleteFile } from "@utils/file";

import { IUpdateUserAvatarRequest } from "./updateUserAvatar.types";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) { }

  async execute({ avatar_file, user_id }: IUpdateUserAvatarRequest): Promise<void> {

    if (!avatar_file) {
      throw new Error('File not found! Please, try again.')
    }

    const user = await this.userRepository.findById(user_id) as User

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    user.avatar = avatar_file

    await this.userRepository.create(user)
  }
}
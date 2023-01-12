import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokens.dto"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository.types"
import { AppDataSource } from "@shared/infra/typeorm/data-source"
import { Repository } from "typeorm"
import { UsersTokens } from "../entities/UsersTokens"

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>

  constructor () {
    this.repository = AppDataSource.getRepository(UsersTokens)
  }

  async create({ 
    expires_date, 
    refresh_token, 
    user_id 
  }: ICreateUsersTokensDTO): Promise<UsersTokens> {
    const userToken = this.repository.create({expires_date, refresh_token, user_id})

    await this.repository.save(userToken)

    return userToken
  }
}

export { UsersTokensRepository }
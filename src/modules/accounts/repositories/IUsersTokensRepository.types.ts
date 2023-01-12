import { ICreateUsersTokensDTO } from "../dtos/ICreateUsersTokens.dto";
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

export interface IUsersTokensRepository {
  create({ expires_date, refresh_token, user_id }: ICreateUsersTokensDTO): Promise<UsersTokens>
}
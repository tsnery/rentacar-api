import { User } from "@modules/accounts/infra/typeorm/entities/User"

export interface IAuthenticateUserRequest {
  email: string
  password: string
}

export interface IAuthenticateUserResponse {
  user: Pick<User, 'name' | 'email'>
  token: string
}
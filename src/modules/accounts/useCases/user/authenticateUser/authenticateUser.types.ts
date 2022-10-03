import { User } from "@modules/accounts/entities/User"

export interface IAuthenticateUserRequest {
  email: string
  password: string
}

export interface IAuthenticateUserResponse {
  user: Pick<User, 'name' | 'email'>
  token: string
}
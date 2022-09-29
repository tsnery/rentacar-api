import { User } from "../../entities/User"

export interface ICreateUserDTO {
  name: string
  password: string
  email: string
  driver_license: string
  avatar?: string
  id?: string
}

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findById(user_id: string): Promise<User | null>
}
import { beforeEach, describe, expect, it } from "vitest";

import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/userInMemory.repository";
import { ICreateUserDTO } from "@modules/accounts/infra/typeorm/repositories/user/user.types";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/createUser.useCase";
import { AuthenticateUserUseCase } from "./authenticateUser.useCase";

let authenticateUserUseCase: AuthenticateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "123123123",
      email: "tainan@email.com",
      name: "Tainan Nery",
      password: "teste123"
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email, password: user.password
    })

    expect(result).toHaveProperty('token')
  })

  it('Should not be able to authenticate a non-existent user', async () => {
    await expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "123123123",
        email: "false@email.com",
        name: "Tainan Nery",
        password: "falsePassword"
      }

      await authenticateUserUseCase.execute({
        email: user.email, password: user.password
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate an incorrect password', async () => {
    await expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "123123123",
        email: "teste@email.com",
        name: "Tainan Nery",
        password: "teste123"
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email, password: 'wrongpassword'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
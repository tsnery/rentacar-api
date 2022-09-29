import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../../modules/accounts/repositories/user/user.repository";

export async function checkAuthentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('Token is missing!')
  }

  const [bearer, token] = authHeader.split(' ')

  if (!(bearer && token)) {
    throw new Error('Token malformatted!')
  }

  try {
    const { sub: user_id } = verify(token, "71547b2ff2302aed12b2e3c673304e02")

    const usersRepository = new UserRepository()

    const userExists = await usersRepository.findById(String(user_id))

    if (!userExists) {
      throw new Error('User does not exists!')
    }

    next()
  } catch (error) {
    throw new Error('Invalid token!')
  }

}
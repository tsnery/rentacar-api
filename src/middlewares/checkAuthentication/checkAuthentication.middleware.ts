import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { UserRepository } from "../../modules/accounts/repositories/user/user.repository";

export async function checkAuthentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token is missing!', 401)
  }

  const [bearer, token] = authHeader.split(' ')

  if (!(bearer && token)) {
    throw new AppError('Token malformatted!', 401)
  }

  try {
    const { sub: user_id } = verify(token, "71547b2ff2302aed12b2e3c673304e02")

    const usersRepository = new UserRepository()

    const userExists = await usersRepository.findById(String(user_id))

    if (!userExists) {
      throw new AppError('User does not exists!', 401)
    }

    next()
  } catch (error) {
    throw new AppError('Invalid token!', 401)
  }

}
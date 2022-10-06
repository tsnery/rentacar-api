import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/user/user.repository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function checkAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user

  const userRepository = new UserRepository()

  const user = await userRepository.findById(id)

  if (!user?.is_admin) {
    throw new AppError('User is not an admin!', 401)
  }

  return next()
}
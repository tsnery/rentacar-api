import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./createCategory.useCase";
import { container } from 'tsyringe'

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

    await createCategoryUseCase.execute({ name, description })

    response.status(201).send()
  }
}
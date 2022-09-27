import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./listCategories.useCase";
import { container } from 'tsyringe';

export class ListCategoriesController {
  async handle(request: Request, response: Response) {

    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

    const categories = await listCategoriesUseCase.execute()

    response.status(200)
    response.json(categories)
  }
}
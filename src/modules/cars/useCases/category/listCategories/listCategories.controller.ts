import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./listCategories.useCase";

export class ListCategoriesController {

  constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

  async handle(request: Request, response: Response) {

    const categories = await this.listCategoriesUseCase.execute()

    response.status(200)
    response.json(categories)
  }
}
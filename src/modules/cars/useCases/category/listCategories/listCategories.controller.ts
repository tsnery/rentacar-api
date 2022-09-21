import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./listCategories.useCase";

export class ListCategoriesController {

  constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

  handle(request: Request, response: Response) {

    const categories = this.listCategoriesUseCase.execute()

    response.status(200)
    response.json(categories)
  }
}
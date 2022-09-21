import { Request, Response } from "express";
import { CategoryRepository } from "../../../repositories/category/category.repository";
import { CreateCategoryUseCase } from "./createCategory.useCase";

const categoriesRepository = new CategoryRepository()

export class CreateCategoryController {

  constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

  handle(request: Request, response: Response) {
    const { name, description } = request.body

    const createCategoryService = new CreateCategoryUseCase(categoriesRepository)

    const category = createCategoryService.execute({ name, description })

    response.status(201).json(category)
  }
}
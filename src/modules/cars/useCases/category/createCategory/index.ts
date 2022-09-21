import { CategoryRepository } from "../../../repositories/category/category.repository";
import { CreateCategoryController } from "./createCategory.controller";
import { CreateCategoryUseCase } from "./createCategory.useCase";

const categoryRepository = CategoryRepository.getInstance()

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)

const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export {
  createCategoryController
}
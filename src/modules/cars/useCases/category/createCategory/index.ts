import { CategoryRepository } from "../../../repositories/category/category.repository";
import { CreateCategoryController } from "./createCategory.controller";
import { CreateCategoryUseCase } from "./createCategory.useCase";

export default (): CreateCategoryController => {
  const categoryRepository = new CategoryRepository()

  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)

  const createCategoryController = new CreateCategoryController(createCategoryUseCase)

  return createCategoryController
}
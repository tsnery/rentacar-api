import { CategoryRepository } from "../../../repositories/category/category.repository";
import { ImportCategoryController } from "./importCategory.controller";
import { ImportCategoryUseCase } from "./importCategory.useCase";

export default (): ImportCategoryController => {
  const categoryRepository = new CategoryRepository()

  const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository)

  const importCategoryController = new ImportCategoryController(importCategoryUseCase)

  return importCategoryController
}
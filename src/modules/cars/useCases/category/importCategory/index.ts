import { CategoryRepository } from "../../../repositories/category/category.repository";
import { ImportCategoryController } from "./importCategory.controller";
import { ImportCategoryUseCase } from "./importCategory.useCase";

const categoryRepository = CategoryRepository.getInstance()

const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository)

const importCategoryController = new ImportCategoryController(importCategoryUseCase)

export {
  importCategoryController
}

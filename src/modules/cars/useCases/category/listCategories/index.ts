import { CategoryRepository } from "../../../repositories/category/category.repository";
import { ListCategoriesController } from "./listCategories.controller";
import { ListCategoriesUseCase } from "./listCategories.useCase";

const categoriesRepository = new CategoryRepository()

const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)

const listCategoriesController = new ListCategoriesController(listCategoriesUseCase)

export {
  listCategoriesController
}
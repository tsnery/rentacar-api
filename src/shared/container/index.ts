import { container } from "tsyringe";
import { CategoryRepository } from "../../modules/cars/repositories/category/category.repository";
import { ICategoryRepository } from "../../modules/cars/repositories/category/category.types";

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
)
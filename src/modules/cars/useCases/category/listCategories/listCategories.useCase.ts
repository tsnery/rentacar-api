import { Category } from "../../../entities/Category";
import { CategoryRepository } from "../../../repositories/category/category.repository";

export class ListCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) { }

  execute(): Category[] {
    const categories = this.categoryRepository.list()

    return categories
  }
}
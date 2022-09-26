import { Category } from "../../../entities/Category";
import { CategoryRepository } from "../../../repositories/category/category.repository";

export class ListCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) { }

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list()

    return categories
  }
}
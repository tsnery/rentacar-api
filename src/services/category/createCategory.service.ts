import { Category } from "../../model/Category"
import { CategoryRepository } from "../../repositories/category/category.repository"
import { CreateCategoryServiceRequest } from "./createCategory.types"

export class CreateCategoryService {
  private categoryRepository: CategoryRepository

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  execute({ name, description }: CreateCategoryServiceRequest): Category {

    const categoryAlreadyExists = this.categoryRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category already exists! Please, create another one.')
    }

    const category = this.categoryRepository.create({ name, description })

    return category
  }
}
import { ICategoryRepository } from "../../repositories/category/category.types"
import { CreateCategoryServiceRequest } from "./createCategory.types"

export class CreateCategoryService {
  private categoryRepository: ICategoryRepository

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  execute({ name, description }: CreateCategoryServiceRequest) {

    const categoryAlreadyExists = this.categoryRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category already exists! Please, create another one.')
    }

    this.categoryRepository.create({ name, description })
  }
}
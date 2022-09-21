import { ICategoryRepository } from "../../../repositories/category/category.types"
import { CreateCategoryUseCaseRequest } from "./createCategory.types"

export class CreateCategoryUseCase {
  private categoryRepository: ICategoryRepository

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  execute({ name, description }: CreateCategoryUseCaseRequest) {

    const categoryAlreadyExists = this.categoryRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category already exists! Please, create another one.')
    }

    this.categoryRepository.create({ name, description })
  }
}
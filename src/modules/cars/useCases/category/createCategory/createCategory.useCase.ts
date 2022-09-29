import { ICategoryRepository } from "../../../repositories/category/category.types"
import { CreateCategoryUseCaseRequest } from "./createCategory.types"
import { inject, injectable } from 'tsyringe'
import { AppError } from "../../../../../errors/AppError"

@injectable()
export class CreateCategoryUseCase {
  private categoryRepository: ICategoryRepository

  constructor(@inject('CategoryRepository') categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute({ name, description }: CreateCategoryUseCaseRequest): Promise<void> {

    const categoryAlreadyExists = await this.categoryRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists! Please, create another one.')
    }

    this.categoryRepository.create({ name, description })
  }
}
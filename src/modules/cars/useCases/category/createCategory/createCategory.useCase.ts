import { inject, injectable } from 'tsyringe'

import { ICreateCategoryUseCaseRequest } from "./createCategory.types"
import { ICategoryRepository } from "@modules/cars/infra/typeorm/repositories/category/category.types"
import { AppError } from "@shared/errors/AppError"

@injectable()
export class CreateCategoryUseCase {

  constructor(@inject('CategoryRepository') private categoryRepository: ICategoryRepository) { }

  async execute({ name, description }: ICreateCategoryUseCaseRequest): Promise<void> {

    const categoryAlreadyExists = await this.categoryRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists! Please, create another one.')
    }

    this.categoryRepository.create({ name, description })
  }
}
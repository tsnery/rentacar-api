import { Category } from '@modules/cars/entities/Category'
import { CategoryRepository } from '@modules/cars/repositories/category/category.repository'
import { inject, injectable } from 'tsyringe'


@injectable()
export class ListCategoriesUseCase {
  constructor(@inject('CategoryRepository') private categoryRepository: CategoryRepository) { }

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list()

    return categories
  }
}
import { Category } from './../../../infra/typeorm/entities/Category';
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/category/category.repository'
import { inject, injectable } from 'tsyringe'


@injectable()
export class ListCategoriesUseCase {
  constructor(@inject('CategoryRepository') private categoryRepository: CategoryRepository) { }

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list()

    return categories
  }
}
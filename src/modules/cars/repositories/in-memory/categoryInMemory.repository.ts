import { v4 as uuidV4 } from 'uuid'

import { CreateCategoryDTO, ICategoryRepository } from '../../infra/typeorm/repositories/category/category.types'
import { Category } from '@modules/cars/entities/Category'

export class CategoryRepositoryInMemory implements ICategoryRepository {

  categories: Category[] = []

  async create({ name, description }: CreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      id: uuidV4(),
      name,
      description,
      created_at: new Date()
    })

    this.categories.push(category)
  }
  async list(): Promise<Category[]> {
    return this.categories
  }
  async findByName(categoryName: string): Promise<Category | null> {
    const category = this.categories.find(category => category.name === categoryName) || null

    return category
  }
}
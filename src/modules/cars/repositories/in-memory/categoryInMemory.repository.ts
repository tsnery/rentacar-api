import { Category } from '../../entities/Category';
import { CreateCategoryDTO, ICategoryRepository } from '../category/category.types'
import { v4 as uuidV4 } from 'uuid'

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
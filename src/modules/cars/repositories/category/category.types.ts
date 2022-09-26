import { Category } from "../../entities/Category"

export interface CreateCategoryDTO {
  name: string
  description: string
}

export interface ICategoryRepository {
  create: ({ name, description }: CreateCategoryDTO) => Promise<void>
  list: () => Promise<Category[]>
  findByName: (categoryName: Category['name']) => Promise<Category | null>
}
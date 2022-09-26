import { Category } from "../../entities/Category"

export interface CreateCategoryDTO {
  name: string
  description: string
}

export interface ICategoryRepository {
  create: ({ name, description }: CreateCategoryDTO) => void
  list: () => Category[]
  findByName: (categoryName: Category['name']) => Category | null
}
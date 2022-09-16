import { Category } from "../../model/Category";
import { CreateCategoryDTO } from "./category.types";

export class CategoryRepository {
  private categories: Category[]

  constructor() {
    this.categories = []
  }

  create({ name, description }: CreateCategoryDTO): Category {
    const category = new Category()

    const newCategory: Category = {
      name,
      description,
      created_at: new Date()
    }

    Object.assign(category, newCategory)

    this.categories.push(newCategory)

    return newCategory
  }

  list(): Category[] {
    return this.categories
  }

  findByName(categoryName: Category['name']): Category | null {
    const category = this.categories.find(item => item.name === categoryName)

    return category || null
  }
}
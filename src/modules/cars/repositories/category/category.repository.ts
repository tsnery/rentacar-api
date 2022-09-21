import { Category } from "../../model/Category";
import { CreateCategoryDTO, ICategoryRepository } from "./category.types";

export class CategoryRepository implements ICategoryRepository {
  private categories: Category[]

  private static INSTANCE: CategoryRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new CategoryRepository()
    }

    return this.INSTANCE
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
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
}
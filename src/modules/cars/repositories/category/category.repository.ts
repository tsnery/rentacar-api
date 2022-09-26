import { Category } from "../../entities/Category";
import { CreateCategoryDTO, ICategoryRepository } from "./category.types";
import { Repository } from 'typeorm'
import { AppDataSource } from "../../../../database/data-source";

export class CategoryRepository implements ICategoryRepository {

  private repository: Repository<Category>

  constructor() {
    this.repository = AppDataSource.getRepository(Category)
  }

  async create({ name, description }: CreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()

    return categories
  }

  async findByName(categoryName: Category['name']): Promise<Category | null> {
    const category = await this.repository.findOne({ where: { name: categoryName } })

    return category
  }
}
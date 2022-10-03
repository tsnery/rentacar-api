import fs from 'fs'
import { parse } from 'csv-parse'
import { inject, injectable } from 'tsyringe'

import { IImportCategoryData, IImportCategoryRequest } from "./importCategory.types";
import { AppError } from '@errors/AppError';
import { CategoryRepository } from '@modules/cars/repositories/category/category.repository';

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository
  ) { }

  private loadCategories(file: Express.Multer.File): Promise<IImportCategoryData[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategoryData[] = []

      const stream = fs.createReadStream(file.path)

      const parseFile = parse()

      stream.pipe(parseFile)

      parseFile.on('data', async (line) => {
        const [name, description] = line
        categories.push({ name, description })
      })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', (err: any) => {
          reject(err || 'Something wrong happened in the file proccess! Please, try again.')
        })
    })
  }

  async execute({ file }: IImportCategoryRequest): Promise<void> {
    if (!file) {
      throw new AppError('No file was found! Please, try again.')
    }

    const categories = await this.loadCategories(file)

    categories.map(async (category) => {
      const { name, description } = category

      const categoryExists = await this.categoryRepository.findByName(name)

      if (!categoryExists) {
        this.categoryRepository.create({
          name,
          description
        })
      }
    })
  }
}
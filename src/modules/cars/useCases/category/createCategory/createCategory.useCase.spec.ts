import { beforeEach, describe, expect, it } from 'vitest'

import { AppError } from '@shared/errors/AppError'
import { CategoryRepositoryInMemory } from '@modules/cars/repositories/in-memory/categoryInMemory.repository'
import { ICreateCategoryUseCaseRequest } from './createCategory.types'
import { CreateCategoryUseCase } from './createCategory.useCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoryRepositoryInMemory: CategoryRepositoryInMemory

describe("Create Category", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryInMemory)
  })

  it('Should be able to create a new category', async () => {
    const newCategory: ICreateCategoryUseCaseRequest = {
      name: 'Category Name',
      description: 'Category description'
    }

    await createCategoryUseCase.execute(newCategory)

    const categoryCreated = await categoryRepositoryInMemory.findByName(newCategory.name)

    expect(categoryCreated).toHaveProperty("id")
  })

  it('Should not be able to create a category with the same name', async () => {
    expect(async () => {
      const newCategory: ICreateCategoryUseCaseRequest = {
        name: 'Category Name',
        description: 'Category description'
      }

      await createCategoryUseCase.execute(newCategory)
      await createCategoryUseCase.execute(newCategory)
    }).rejects.toBeInstanceOf(AppError)
  })
})
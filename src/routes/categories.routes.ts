import { Router } from 'express'
import { CategoryRepository } from '../modules/cars/repositories/category/category.repository'
import { createCategoryController } from '../modules/cars/useCases/category/createCategory'

const categoriesRoutes = Router()
const categoriesRepository = new CategoryRepository()

categoriesRoutes.post('/', (request, response) => {
  createCategoryController.handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  const categories = categoriesRepository.list()

  response.status(200)
  response.json(categories)
})

export {
  categoriesRoutes
}
import { Router } from 'express'
import { CategoryRepository } from '../repositories/category/category.repository'
import { CreateCategoryService } from '../services/category/createCategory.service'

const categoriesRoutes = Router()
const categoriesRepository = new CategoryRepository()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const createCategoryService = new CreateCategoryService(categoriesRepository)

  const category = createCategoryService.execute({ name, description })

  response.status(201).json(category)
})

categoriesRoutes.get('/', (request, response) => {
  const categories = categoriesRepository.list()

  response.status(200)
  response.json(categories)
})

export {
  categoriesRoutes
}
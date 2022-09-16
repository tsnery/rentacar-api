import { Router } from 'express'
import { Category } from '../model/Category'
import { CategoryRepository } from '../repositories/category/category.repository'

const categoriesRoutes = Router()
const categoriesRepository = new CategoryRepository()

categoriesRoutes.post('/categories', (request, response) => {
  const { name, description } = request.body

  const category = categoriesRepository.create({ name, description })

  response.status(201).json(category)
})

export {
  categoriesRoutes
}
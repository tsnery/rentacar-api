import { Router } from 'express'
import { CategoryRepository } from '../repositories/category/category.repository'

const categoriesRoutes = Router()
const categoriesRepository = new CategoryRepository()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const categoryAlreadyExists = categoriesRepository.findByName(name)

  if (categoryAlreadyExists) {
    return response.status(400).json({ error: 'Category already exists! Please, create another one.' })
  }

  const category = categoriesRepository.create({ name, description })

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
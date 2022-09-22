import { Router } from 'express'
import multer from 'multer'

import { createCategoryController } from '../modules/cars/useCases/category/createCategory'
import { importCategoryController } from '../modules/cars/useCases/category/importCategory'
import { listCategoriesController } from '../modules/cars/useCases/category/listCategories'

const categoriesRoutes = Router()

const upload = multer({
  dest: './temp',
})

categoriesRoutes.post('/', (request, response) => {
  createCategoryController.handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  listCategoriesController.handle(request, response)
})

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  importCategoryController.handle(request, response)
})

export {
  categoriesRoutes
}
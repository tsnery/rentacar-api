import { Router } from 'express'
import multer from 'multer'
import { CreateCategoryController } from '../modules/cars/useCases/category/createCategory/createCategory.controller'

import importCategoryController from '../modules/cars/useCases/category/importCategory'
import listCategoriesController from '../modules/cars/useCases/category/listCategories'

const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()

const upload = multer({
  dest: './temp',
})

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', (request, response) => {
  listCategoriesController().handle(request, response)
})

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  importCategoryController().handle(request, response)
})

export {
  categoriesRoutes
}
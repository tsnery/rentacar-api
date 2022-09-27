import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '../modules/cars/useCases/category/createCategory/createCategory.controller'
import { ImportCategoryController } from '../modules/cars/useCases/category/importCategory/importCategory.controller'
import { ListCategoriesController } from '../modules/cars/useCases/category/listCategories/listCategories.controller'

const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()
const listCategoriesContorller = new ListCategoriesController()
const importCategoryController = new ImportCategoryController()

const upload = multer({
  dest: './temp',
})

categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.get('/', listCategoriesContorller.handle)
categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle)

export {
  categoriesRoutes
}
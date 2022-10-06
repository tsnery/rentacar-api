import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '@modules/cars/useCases/category/createCategory/createCategory.controller'
import { ImportCategoryController } from '@modules/cars/useCases/category/importCategory/importCategory.controller'
import { ListCategoriesController } from '@modules/cars/useCases/category/listCategories/listCategories.controller'
import { checkAuthentication } from '@shared/infra/middlewares/checkAuthentication/checkAuthentication.middleware'
import { checkAdmin } from '@shared/infra/middlewares/checkAdmin'


const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()
const listCategoriesContorller = new ListCategoriesController()
const importCategoryController = new ImportCategoryController()

const upload = multer({
  dest: './tmp',
})

categoriesRoutes.post(
  '/',
  checkAuthentication,
  checkAdmin,
  createCategoryController.handle
)
categoriesRoutes.get('/', listCategoriesContorller.handle)
categoriesRoutes.post(
  '/import', upload.single('file'),
  checkAuthentication,
  checkAdmin,
  importCategoryController.handle
)

export {
  categoriesRoutes
}
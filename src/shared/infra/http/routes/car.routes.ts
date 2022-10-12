import { Router } from "express";
import multer from "multer";

import { CreateCarController } from "@modules/cars/useCases/car/createCar/createCar.controller";
import { ListCarsController } from "@modules/cars/useCases/car/listCars/listCars.controller";
import { UploadCarImagesController } from "@modules/cars/useCases/car/uploadCarImages/uploadCarImages.controller";
import { CreateCarSpecificationController } from "@modules/cars/useCases/carSpecification/createCarSpecification/createCarSpecification.controller";

import { checkAdmin } from "@shared/infra/middlewares/checkAdmin";
import { checkAuthentication } from "@shared/infra/middlewares/checkAuthentication/checkAuthentication.middleware";
import uploadConfig from "@config/uploadConfig";

const carsRoutes = Router()

const uploadCarImages = multer(uploadConfig.upload('./tmp/cars'))

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const createCarSpecificationsController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

carsRoutes.post(
  '/',
  checkAuthentication,
  checkAdmin,
  createCarController.handle
)

carsRoutes.get(
  '/availables',
  listCarsController.handle
)

carsRoutes.post(
  '/specifications/:id',
  checkAuthentication,
  checkAdmin,
  createCarSpecificationsController.handle)

carsRoutes.post(
  '/images/:id',
  checkAuthentication,
  checkAdmin,
  uploadCarImages.array('images'),
  uploadCarImagesController.handle
)

export {
  carsRoutes
}
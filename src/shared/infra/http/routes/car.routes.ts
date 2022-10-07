import { CreateCarController } from "@modules/cars/useCases/car/createCar/createCar.controller";
import { ListCarsController } from "@modules/cars/useCases/car/listCars/listCars.controller";
import { checkAdmin } from "@shared/infra/middlewares/checkAdmin";
import { checkAuthentication } from "@shared/infra/middlewares/checkAuthentication/checkAuthentication.middleware";
import { Router } from "express";

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()

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

export {
  carsRoutes
}
import { CreateCarController } from "@modules/cars/useCases/car/createCar/createCar.controller";
import { checkAdmin } from "@shared/infra/middlewares/checkAdmin";
import { checkAuthentication } from "@shared/infra/middlewares/checkAuthentication/checkAuthentication.middleware";
import { Router } from "express";

const carsRoutes = Router()

const createCarController = new CreateCarController()

carsRoutes.post(
  '/',
  checkAuthentication,
  checkAdmin,
  createCarController.handle
)

export {
  carsRoutes
}
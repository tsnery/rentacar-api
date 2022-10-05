import { CreateCarController } from "@modules/cars/useCases/car/createCar/createCar.controller";
import { Router } from "express";

const carsRoutes = Router()

const createCarController = new CreateCarController()

carsRoutes.post('/', createCarController.handle)

export {
  carsRoutes
}
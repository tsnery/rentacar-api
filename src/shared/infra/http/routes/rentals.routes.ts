import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRental.controller";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/devolutionRental.controller";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/listRentalsByUser.controller";
import { checkAuthentication } from "@shared/infra/middlewares/checkAuthentication/checkAuthentication.middleware";
import { Router } from "express";

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

const rentalsRoutes = Router()

rentalsRoutes.post(
  '/', 
  checkAuthentication, 
  createRentalController.handle
)
rentalsRoutes.post(
  '/devolution/:id',
  checkAuthentication, 
  devolutionRentalController.handle
)
rentalsRoutes.get(
  '/user',
  checkAuthentication,
  listRentalsByUserController.handle
)

export { rentalsRoutes }
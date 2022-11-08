import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRental.controller";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/devolutionRental.controller";
import { checkAuthentication } from "@shared/infra/middlewares/checkAuthentication/checkAuthentication.middleware";
import { Router } from "express";

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

const rentalsRoutes = Router()

rentalsRoutes.post('/', checkAuthentication, createRentalController.handle)
rentalsRoutes.post('/devolution/:id', checkAuthentication, devolutionRentalController.handle)

export { rentalsRoutes }
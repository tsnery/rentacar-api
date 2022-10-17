import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRental.controller";
import { checkAuthentication } from "@shared/infra/middlewares/checkAuthentication/checkAuthentication.middleware";
import { Router } from "express";

const createRentalController = new CreateRentalController()

const rentalsRoutes = Router()

rentalsRoutes.post('/', checkAuthentication, createRentalController.handle)

export { rentalsRoutes }
import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/specification/createSpecification/createSpecification.controller";
import { ListSpecificationsController } from "@modules/cars/useCases/specification/listSpecifications/listSpecifications.controller";
import { checkAuthentication } from "@shared/infra/middlewares/checkAuthentication/checkAuthentication.middleware";
import { checkAdmin } from "@shared/infra/middlewares/checkAdmin";

const createSpecificationController = new CreateSpecificationController()
const listSpecificationController = new ListSpecificationsController()

const specificationsRoutes = Router()

specificationsRoutes.post(
  '/',
  checkAuthentication,
  checkAdmin,
  createSpecificationController.handle
)
specificationsRoutes.get(
  '/',
  listSpecificationController.handle
)

export {
  specificationsRoutes
}
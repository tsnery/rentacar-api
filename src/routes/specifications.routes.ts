import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/specification/createSpecification/createSpecification.controller";
import { ListSpecificationsController } from "@modules/cars/useCases/specification/listSpecifications/listSpecifications.controller";

const createSpecificationController = new CreateSpecificationController()
const listSpecificationController = new ListSpecificationsController()

const specificationsRoutes = Router()

specificationsRoutes.post('/', createSpecificationController.handle)
specificationsRoutes.get('/', listSpecificationController.handle)

export {
  specificationsRoutes
}
import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCases/specification/createSpecification/createSpecification.controller";
// import { listSpecificationsController } from "../modules/cars/useCases/specification/listSpecifications";

const createSpecificationController = new CreateSpecificationController()

const specificationsRoutes = Router()

specificationsRoutes.post('/', createSpecificationController.handle)

// specificationsRoutes.get('/', (request, response) => {
//   listSpecificationsController.handle(request, response)
// })

export {
  specificationsRoutes
}
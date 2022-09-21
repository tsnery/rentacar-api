import { Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/specification/specification.repository";
import { CreateSpecificationService } from "../modules/cars/services/specification/createSpecification/createSpecification.service";

const specificationsRoutes = Router()
const specificationRepository = new SpecificationRepository()

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const createSpecificationService = new CreateSpecificationService(specificationRepository)

  const specification = createSpecificationService.execute({ name, description })

  response.status(201).json(specification)
})

export {
  specificationsRoutes
}
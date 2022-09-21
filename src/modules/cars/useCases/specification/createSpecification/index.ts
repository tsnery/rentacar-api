import { SpecificationRepository } from "../../../repositories/specification/specification.repository";
import { CreateSpecificationController } from "./createSpecification.controller";
import { CreateSpecificationUseCase } from "./createSpecification.useCase";

const specificationRepository = SpecificationRepository.getInstance()

const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository)

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export {
  createSpecificationController
}
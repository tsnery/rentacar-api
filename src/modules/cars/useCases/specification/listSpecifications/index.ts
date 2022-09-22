import { SpecificationRepository } from "../../../repositories/specification/specification.repository";
import { ListSpecificationsUseCase } from "./listSpecification.useCase";
import { ListSpecificationsController } from "./listSpecifications.controller";

const specificationRepository = SpecificationRepository.getInstance()

const listSpecificationsUseCase = new ListSpecificationsUseCase(specificationRepository)

const listSpecificationsController = new ListSpecificationsController(listSpecificationsUseCase)

export {
  listSpecificationsController
}
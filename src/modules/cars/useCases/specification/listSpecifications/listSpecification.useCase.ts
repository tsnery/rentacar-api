import { SpecificationRepository } from "../../../repositories/specification/specification.repository";

export class ListSpecificationsUseCase {
  constructor(private specificationRepository: SpecificationRepository) { }

  execute() {
    const specifications = this.specificationRepository.findAll()

    return specifications
  }
}
import { ISpecificationRepository } from "../../../repositories/specification/specification.types";
import { ICreateSpecificationRequest } from "./createSpecification.types";

export class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationRepository) {
    this.specificationRepository = specificationRepository
  }

  execute({ name, description }: ICreateSpecificationRequest) {

    const specificationAlreadyExists = this.specificationRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!')
    }

    this.specificationRepository.create({
      name,
      description
    })
  }
}
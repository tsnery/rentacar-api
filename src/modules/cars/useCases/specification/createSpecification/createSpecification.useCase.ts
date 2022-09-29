import { ISpecificationRepository } from "../../../repositories/specification/specification.types";
import { ICreateSpecificationRequest } from "./createSpecification.types";
import { inject, injectable } from 'tsyringe'
import { AppError } from "../../../../../errors/AppError";

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {
    this.specificationRepository = specificationRepository
  }

  async execute({ name, description }: ICreateSpecificationRequest): Promise<void> {

    const specificationAlreadyExists = await this.specificationRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!')
    }

    return this.specificationRepository.create({
      name,
      description
    })
  }
}
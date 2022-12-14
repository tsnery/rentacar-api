import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError';
import { ICreateSpecificationRequest } from "./createSpecification.types";
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';

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
import { inject, injectable } from 'tsyringe'

import { Specification } from '@modules/cars/entities/Specification'
import { SpecificationRepository } from '@modules/cars/repositories/specification/specification.repository'

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: SpecificationRepository
  ) { }

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.findAll()

    return specifications
  }
}
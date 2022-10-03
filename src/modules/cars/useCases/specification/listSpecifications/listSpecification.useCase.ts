import { inject, injectable } from 'tsyringe'

import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/specification/specification.repository'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

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
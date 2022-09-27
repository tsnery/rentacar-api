import { SpecificationRepository } from "../../../repositories/specification/specification.repository";
import { inject, injectable } from 'tsyringe'
import { Specification } from "../../../entities/Specification";

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
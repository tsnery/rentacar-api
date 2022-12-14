import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";

export class SpecificationRepositoryInMemory implements ISpecificationRepository {

  specifications: Specification[] = []

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, { name, description })

    this.specifications.push(specification)

    return specification
  }

  async findByName(name: string): Promise<Specification | null> {
    return this.specifications.find(specification => specification.name === name) || null
  }

  async findAll(): Promise<Specification[]> {
    return this.specifications
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(specification => ids.includes(specification.id))
  }
}
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { ICreateSpecificationDTO, ISpecificationRepository } from "./specification.types";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

export class SpecificationRepository implements ISpecificationRepository {

  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description
    })

    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findOne({ where: { name } })

    return specification
  }

  async findAll(): Promise<Specification[]> {
    const specifications = await this.repository.find()

    return specifications
  }
}
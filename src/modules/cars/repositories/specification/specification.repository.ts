import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "./specification.types";

export class SpecificationRepository implements ISpecificationRepository {

  private specifications: Specification[]

  private static INSTANCE: SpecificationRepository

  private constructor() {
    this.specifications = []
  }

  public static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new SpecificationRepository()
    }

    return this.INSTANCE
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification()

    Object.assign(specification, { name, description, created_at: new Date() })

    this.specifications.push(specification)
  }

  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find(item => item.name === name)

    return specification
  }

  findAll(): Specification[] {
    return this.specifications
  }
}
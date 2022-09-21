import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./createSpecification.useCase";

export class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) { }

  handle(request: Request, response: Response) {
    const { name, description } = request.body

    const specification = this.createSpecificationUseCase.execute({ name, description })

    response.status(201).json(specification)
  }
}
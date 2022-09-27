import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./createSpecification.useCase";
import { container } from 'tsyringe';

export class CreateSpecificationController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)

    await createSpecificationUseCase.execute({ name, description })

    response.status(201).send()
  }
}
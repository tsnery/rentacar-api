import { Request, Response } from "express";
import { container } from 'tsyringe';
import { ListSpecificationsUseCase } from "./listSpecification.useCase";

export class ListSpecificationsController {
  async handle(request: Request, response: Response) {
    const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase)

    const specifications = await listSpecificationsUseCase.execute()

    response.status(200).json(specifications)
  }
}
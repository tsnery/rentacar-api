import { Request, Response } from "express";
import { ListSpecificationsUseCase } from "./listSpecification.useCase";

export class ListSpecificationsController {

  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) { }

  handle(request: Request, response: Response) {
    const specifications = this.listSpecificationsUseCase.execute()

    response.status(200).json(specifications)
  }
}
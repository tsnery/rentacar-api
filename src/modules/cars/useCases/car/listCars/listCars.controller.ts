import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsUseCase } from "./listCars.useCase";

export class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query

    const listCarsUseCase = container.resolve(ListCarsUseCase)

    const cars = await listCarsUseCase.execute({
      brand: brand as string,
      category_id: category_id as string,
      name: name as string
    })

    return response.status(200).json(cars)
  }
}
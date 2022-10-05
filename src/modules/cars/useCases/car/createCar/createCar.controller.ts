import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./createCar.useCase";

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate
    } = request.body

    const createCarUseCase = container.resolve(CreateCarUseCase)

    const car = await createCarUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    })

    return response.status(201).json(car)
  }
}
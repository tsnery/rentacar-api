import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./importCategory.useCase";
import { container } from 'tsyringe';

export class ImportCategoryController {
  async handle(request: Request, response: Response) {
    const { file } = request

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

    await importCategoryUseCase.execute({ file })

    response.status(201).send()
  }
}
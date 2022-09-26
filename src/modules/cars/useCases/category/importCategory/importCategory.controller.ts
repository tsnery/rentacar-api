import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./importCategory.useCase";

export class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) { }

  async handle(request: Request, response: Response) {
    const { file } = request

    await this.importCategoryUseCase.execute({ file })

    response.status(201).send()
  }
}
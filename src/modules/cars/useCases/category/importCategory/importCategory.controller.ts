import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./importCategory.useCase";

export class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) { }

  handle(request: Request, response: Response) {
    const { file } = request

    this.importCategoryUseCase.execute({ file })

    response.status(201).send()
  }
}
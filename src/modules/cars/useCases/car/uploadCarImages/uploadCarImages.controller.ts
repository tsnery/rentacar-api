import removeFile from "@config/removeFile";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { IFilesRequest } from "./uploadCarImages.types";
import { UploadCarImagesUseCase } from "./uploadCarImages.usecase";

export class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const images = request.files as IFilesRequest[]

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)

    const images_name = images?.map(file => file.filename)

    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name
    })

    images?.map(file => {
      removeFile.remove('./tmp/cars', file.filename)
    })

    return response.status(201).send()
  }
}
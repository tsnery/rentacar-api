import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { inject, injectable } from "tsyringe";
import { IUploadCarImageRequest } from "./uploadCarImages.types";

@injectable()
export class UploadCarImagesUseCase {

  constructor(@inject('CarImageRepository') private carImageRepository: ICarImageRepository) { }

  async execute({ car_id, images_name }: IUploadCarImageRequest): Promise<void> {
    images_name.map(async (name) => {
      await this.carImageRepository.create(car_id, name)
    })
  }
}
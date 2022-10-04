import { ICreateCarDTO } from "../dtos/ICreateCarDTO";

export interface ICarRepository {
  create(data: ICreateCarDTO): Promise<void>
}
import { Category } from "@modules/cars/infra/typeorm/entities/Category";

export interface ICreateCategoryUseCaseRequest extends Pick<Category, 'name' | 'description'> { }
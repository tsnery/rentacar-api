import { Category } from "@modules/cars/entities/Category";

export interface ICreateCategoryUseCaseRequest extends Pick<Category, 'name' | 'description'> { }
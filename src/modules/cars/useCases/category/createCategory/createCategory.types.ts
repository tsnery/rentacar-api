import { Category } from "../../../entities/Category";

export interface ICreateCategoryUseCaseRequest extends Pick<Category, 'name' | 'description'> { }
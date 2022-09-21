import { Category } from "../../../model/Category";

export interface CreateCategoryUseCaseRequest extends Pick<Category, 'name' | 'description'> { }
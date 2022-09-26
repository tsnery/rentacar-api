import { Category } from "../../../entities/Category";

export interface CreateCategoryUseCaseRequest extends Pick<Category, 'name' | 'description'> { }
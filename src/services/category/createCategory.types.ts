import { Category } from "../../model/Category";

export interface CreateCategoryServiceRequest extends Pick<Category, 'name' | 'description'> { }
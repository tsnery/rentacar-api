import { container } from "tsyringe";

import { UserRepository } from "@modules/accounts/repositories/user/user.repository";
import { IUserRepository } from "@modules/accounts/repositories/user/user.types";
import { CategoryRepository } from "@modules/cars/repositories/category/category.repository";
import { ICategoryRepository } from "@modules/cars/repositories/category/category.types";
import { SpecificationRepository } from "@modules/cars/repositories/specification/specification.repository";
import { ISpecificationRepository } from "@modules/cars/repositories/specification/specification.types";

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
)

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
)

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
)
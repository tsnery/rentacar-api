import { container } from "tsyringe";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/user/user.repository";
import { IUserRepository } from "@modules/accounts/infra/typeorm/repositories/user/user.types";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/category/category.repository";
import { ICategoryRepository } from "@modules/cars/infra/typeorm/repositories/category/category.types";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/specification/specification.repository";
import { ISpecificationRepository } from "@modules/cars/infra/typeorm/repositories/specification/specification.types";

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
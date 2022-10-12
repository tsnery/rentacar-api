import { container } from "tsyringe";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/user/user.repository";
import { IUserRepository } from "@modules/accounts/infra/typeorm/repositories/user/user.types";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/category/category.repository";
import { ICategoryRepository } from "@modules/cars/infra/typeorm/repositories/category/category.types";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/specification/specification.repository";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/car/car.repository";
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { CarImageRepository } from "@modules/cars/infra/typeorm/repositories/carImage.repository";

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

container.registerSingleton<ICarRepository>(
  'CarRepository',
  CarRepository
)

container.registerSingleton<ICarImageRepository>(
  'CarImageRepository',
  CarImageRepository
)
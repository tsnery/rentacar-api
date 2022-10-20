import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { DataSource } from "typeorm";
import { CreateCategories1664201347336 } from "./migrations/1664201347336-CreateCategories";
import { CreateSpecifications1664318699145 } from "./migrations/1664318699145-CreateSpecifications";
import { CreateUsers1664372234367 } from "./migrations/1664372234367-CreateUsers";
import { AlterUserDeleteUsername1664375932444 } from "./migrations/1664375932444-AlterUserDeleteUsername";
import { AlterUserAddAvatar1664458126035 } from "./migrations/1664458126035-AlterUserAddAvatar";
import { CreateCars1664836614638 } from "./migrations/1664836614638-CreateCars";
import { CreateSpecificationsCars1665105117449 } from "./migrations/1665105117449-CreateSpecificationsCars";
import { AlterSpecificationsCarsDropId1665424600449 } from "./migrations/1665424600449-AlterSpecificationsCarsDropId";
import { CreateCarImages1665495589044 } from "./migrations/1665495589044-CreateCarImages";
import { CreateRentals1665681935769 } from "./migrations/1665681935769-CreateRentals";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "rentacar",
  password: "rentacarpassword",
  database: "rentacar",
  logging: false,
  entities: [User, Car, CarImage, Category, Specification, Rental],
  migrations: [
    CreateCategories1664201347336,
    CreateSpecifications1664318699145,
    CreateUsers1664372234367,
    AlterUserDeleteUsername1664375932444,
    AlterUserAddAvatar1664458126035,
    CreateCars1664836614638,
    CreateSpecificationsCars1665105117449,
    AlterSpecificationsCarsDropId1665424600449,
    CreateCarImages1665495589044,
    CreateRentals1665681935769
  ],
  subscribers: [],
})
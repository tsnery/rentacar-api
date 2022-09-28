import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/user/createUser/createUser.controller";

const createUserController = new CreateUserController()

const usersRoutes = Router()

usersRoutes.post('/', createUserController.handle)

export { usersRoutes }
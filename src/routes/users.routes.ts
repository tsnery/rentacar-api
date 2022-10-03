import { Router } from "express";
import multer from "multer";

import { checkAuthentication } from "@middlewares/checkAuthentication/checkAuthentication.middleware";
import { CreateUserController } from "@modules/accounts/useCases/user/createUser/createUser.controller";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/user/updateUserAvatar/updateUserAvatar.controller";
import uploadAvatar from "../config/uploadAvatar";

const usersRoutes = Router()

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

const upload = multer(uploadAvatar.upload('./tmp/avatar'))

usersRoutes.post('/', createUserController.handle)
usersRoutes.patch(
  '/avatar',
  checkAuthentication,
  upload.single('avatar'),
  updateUserAvatarController.handle
)

export { usersRoutes }
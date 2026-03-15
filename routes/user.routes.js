import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers, delUser, putUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id',authorize, getUser);

userRouter.put('/:id', authorize, putUser);

userRouter.delete('/:id', authorize, delUser);

export default userRouter;
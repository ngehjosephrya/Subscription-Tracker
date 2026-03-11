import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id',authorize, getUser);

userRouter.put('/:id', (req, res) => res.send('Update user route'));

userRouter.delete('/:id', (req, res) => res.send('Delete user route'));

export default userRouter;
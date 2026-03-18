import {Router} from 'express';
import { signUp, signIn, signOut } from '../controllers/auth.controller.js';
import authenticateToken from '../middlewares/authToken.middleware.js';
import { checkBlacklist } from '../middlewares/checkBlacklisted.middleware.js';

const authRouter = Router();

//path: /api/v1/auth/sign-up (POST)
authRouter.post('/sign-up', signUp);

//path: /api/v1/auth/sign-in (POST)
authRouter.post('/sign-in', signIn);

//path: /api/v1/auth/sign-out (POST)
authRouter.post('/sign-out',authenticateToken, checkBlacklist, signOut);

export default authRouter;
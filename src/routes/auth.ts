import {Router} from 'express';
import {Routes} from '@/interfaces';
import {getLogin, getSignup, postLogin, postLogout, postSignup} from '@/controllers/auth';

const authRouter = Router();

authRouter.get(Routes.login, getLogin);
authRouter.post(Routes.login, postLogin);
authRouter.get(Routes.signup, getSignup);
authRouter.post(Routes.signup, postSignup);
authRouter.post(Routes.logout, postLogout);

export default authRouter;

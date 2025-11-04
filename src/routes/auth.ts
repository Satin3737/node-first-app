import {Router} from 'express';
import {Routes} from '@/interfaces';
import {
    getLogin,
    getNewPassword,
    getReset,
    getSignup,
    postLogin,
    postLogout,
    postNewPassword,
    postReset,
    postSignup
} from '@/controllers/auth';

const authRouter = Router();

authRouter.get(Routes.login, getLogin);
authRouter.post(Routes.login, postLogin);
authRouter.get(Routes.signup, getSignup);
authRouter.post(Routes.signup, postSignup);
authRouter.post(Routes.logout, postLogout);
authRouter.get(Routes.reset, getReset);
authRouter.post(Routes.reset, postReset);
authRouter.get(Routes.newPassword, getNewPassword);
authRouter.post(Routes.newPassword, postNewPassword);

export default authRouter;

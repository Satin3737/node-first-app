import {Router} from 'express';

const notFoundRouter = Router();

notFoundRouter.use((_, res) => {
    res.status(404).render('404', {title: 'Page Not Found'});
});

export default notFoundRouter;

import {RequestHandler} from 'express';

export const notFoundController: RequestHandler = (_, res) => {
    res.status(404).render('other/not-found', {title: 'Page Not Found'});
};

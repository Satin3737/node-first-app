import {RequestHandler} from 'express';

export const notFoundController: RequestHandler = (_, res) => {
    res.status(404).render('404', {title: 'Page Not Found'});
};

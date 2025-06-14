import {RequestHandler} from 'express';

export const notFoundController: RequestHandler = (_, res) => {
    res.status(404).render('404', {path: '', title: 'Page Not Found'});
};

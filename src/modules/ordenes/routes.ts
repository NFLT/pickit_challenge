import {Router, Request, Response, json} from 'express';

const routes = Router();

routes.get('/ordenes/', (req: Request, res: Response) => {
    res.json('Probando ordenes');
});

export default routes;
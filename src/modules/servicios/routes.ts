import {Router, Request, Response} from 'express';

const routes = Router();

routes.get('/servicios/', (req: Request, res: Response) => {
    res.json('Probando servicios');
});

export default routes;
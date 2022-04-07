import {Router, Request, Response} from 'express';

const routes = Router();

routes.get('/automoviles/', (req: Request, res: Response) => {
    res.json('Probando automóviles');
});

export default routes;
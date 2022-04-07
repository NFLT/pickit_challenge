import {Router, Request, Response, json} from 'express';

const routes = Router();

routes.get('/automoviles/', (req: Request, res: Response) => {
    res.json('Probando automóviles');
});

export default routes;
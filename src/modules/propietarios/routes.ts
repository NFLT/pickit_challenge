import {Router, Request, Response, json} from 'express';

const routes = Router();

routes.get('/propietarios/', (req: Request, res: Response) => {
    res.json('Probando propietarios');
});

export default routes;
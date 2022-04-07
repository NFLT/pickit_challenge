import {Router, Request, Response} from 'express';

const routes = Router();

routes.get('/propietarios/', (req: Request, res: Response) => {
    res.json('Probando propietarios');
});

export default routes;
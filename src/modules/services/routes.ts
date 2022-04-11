import { Router } from 'express';
import * as serviceController from './controller';

const routes = Router();

routes.post('/services/', serviceController.createService);
routes.put('/services/:idService', serviceController.updateService);
routes.get('/services/', serviceController.getServices);
routes.get('/services/:idService', serviceController.getService);
routes.delete('/services/:idService', serviceController.deleteService);

export default routes;
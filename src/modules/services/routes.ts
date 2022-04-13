import { Router } from 'express';
import * as serviceController from './controller';
import * as serviceValidator from '../../validators/service';


const routes = Router();

routes.post('/services/', serviceValidator.validateCreate,serviceController.createService);
routes.put('/services/:idService', serviceValidator.validateUpdate, serviceController.updateService);
routes.get('/services/', serviceController.getServices);
routes.get('/services/:idService', serviceController.getService);

export default routes;
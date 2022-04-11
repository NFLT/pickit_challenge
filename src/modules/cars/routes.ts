import { Router } from 'express';
import * as carController from './controller';

const routes = Router();

routes.post('/cars/', carController.createCar);
routes.put('/cars/:idCar', carController.updateCar);
routes.get('/cars/', carController.getCars);
routes.get('/cars/:idCar', carController.getCar);
routes.delete('/cars/:idCar', carController.deleteCar);

export default routes;
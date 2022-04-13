import { Router } from 'express';
import * as carController from './controller';
import * as carValidator from '../../validators/cars';

const routes = Router();

routes.post('/cars/', carValidator.validateCreate, carController.createCar);
routes.put('/cars/:idCar', carValidator.validateUpdate, carController.updateCar);
routes.get('/cars/', carController.getCars);
routes.get('/cars/:idCar', carValidator.validateGetCarById,carController.getCar);
routes.delete('/cars/:idCar', carValidator.validateDelete, carController.deleteCar);

export default routes;
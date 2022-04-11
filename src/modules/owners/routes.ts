import { Router } from 'express';
import { validateCreate, validateUpdate } from '../../validators/owners';
import * as ownerController from './controller';

const routes = Router();

routes.post('/owners/', validateCreate, ownerController.createOwner);
routes.put('/owners/:idOwner', validateUpdate, ownerController.updateOwner);
routes.get('/owners/', ownerController.getOwners);
routes.get('/owners/:idOwner', ownerController.getOwner);
routes.delete('/owners/:idOwner', ownerController.deleteOwner);

routes.get('/owners/:idOwner/cars', ownerController.getCars);

export default routes;
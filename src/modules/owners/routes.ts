import { Router } from 'express';
import * as ownerController from './controller';

const routes = Router();

routes.post('/owners/', ownerController.createOwner);
routes.put('/owners/:idOwner', ownerController.updateOwner);
routes.get('/owners/', ownerController.getOwners);
routes.get('/owners/:idOwner', ownerController.getOwner);
routes.delete('/owners/:idOwner', ownerController.deleteOwner);

export default routes;
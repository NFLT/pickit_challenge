import { Router } from 'express';
import * as orderController from './controller';

const routes = Router();

routes.post('/orders/', orderController.createOrder);
routes.get('/orders/', orderController.getOrders);
routes.get('/orders/:idOrder', orderController.getOrder);

// Agregan y quitan servicios del 
routes.post('/orders/:idOrder/services/:idService', orderController.addService);
routes.delete('/orders/:idOrder/services/:idService', orderController.removeService);

// Manejan los estados de la orden 
routes.patch('/orders/:idOrder/confirm', orderController.confirmOrder);
routes.patch('/orders/:idOrder/close', orderController.closeOrder);
routes.patch('/orders/:idOrder/close', orderController.cancelOrder);

export default routes;
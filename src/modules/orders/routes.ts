import { Router } from 'express';
import * as orderController from './controller';
import * as orderValidator from '../../validators/orders';

const routes = Router();

routes.post('/orders/', orderValidator.validateCreateOrder,orderController.createOrder);
routes.get('/orders/', orderController.getOrders);
routes.get('/orders/:idOrder', orderController.getOrder);

// Agregan y quitan servicios de la orden
routes.post('/orders/:idOrder/services/:idService', orderValidator.validateAddService, orderController.addService);
routes.delete('/orders/:idOrder/services/:idService', orderValidator.validateRemoveService, orderController.removeService);

// Manejan los estados de la orden 
routes.patch('/orders/:idOrder/confirm', orderValidator.validateConfirmOrder, orderController.confirmOrder);
routes.patch('/orders/:idOrder/close', orderValidator.validateCloseOrder, orderController.closeOrder);
routes.patch('/orders/:idOrder/cancel', orderValidator.validateCancelOrder, orderController.cancelOrder);

export default routes;
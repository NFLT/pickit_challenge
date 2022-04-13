import { Router } from 'express';
import * as orderController from './controller';
import * as orderValidator from '../../validators/orders';

const routes = Router();



/**
 * @swagger
 * /orders:
 *      post:
 *          summary: Crea una nueva orden/presupuesto de los servicios que el propietario contrata a la empresa de servicios mecánico 
 *          tags: [Orders]
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              idCar:
 *                                  type: integer
 *                                  description: Id del automovil al que se le van a efectuar los servicios 
 *                     
 *                          required:
 *                              - idCar
 * 
 *                      example:
 *                          idCar: 6
 *          responses:
 *              201:
 *                  description: Se registró una nueva orden en estado abierto para poder agregarle servicios
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  idOrder:
 *                                      type: integer
 *                                      description: ID de la nueva orden
 *                          example: 
 *                              idOwner: 19
 *              400:
 *                  description: Ha ocurrido un error de validación de los datos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  errors:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              value:
 *                                                  type: string
 *                                                  description: Valor del campo que generó el error
 *                                              msg:
 *                                                  type: string
 *                                                  description: Mensaje de error
 *                                              param:
 *                                                  type: string
 *                                                  description: Parámetro que género el error
 *                                              location:
 *                                                  type: string
 *                                                  description: Ubicación del error
 *                                  
 * 
 *              500:
 *                  description: Ha ocurrido un error interno en el servidor
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  errCode: 
 *                                      type: integer
 *                                      description: Código interno de error
 *                                  msg:
 *                                      type: string
 *                                      description: Mensaje genérico de error
 *                              example:
 *                                  errCode: 1000
 *                                  msg: Ha ocurrido un error en intentar ejecutar la operación
 *                              
 */
routes.post('/orders/', orderValidator.validateCreateOrder,orderController.createOrder);

/**
 * @swagger
 * /orders:
 *      get:
 *          summary: Recupera todas ordenes registradas en base de datos
 *          tags: [Orders]
 *          responses:
 *              200:
 *                  description: Se obtiene un listado con todas almacenadas en base de datos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  orders:
 *                                      type: array 
 *                                      items:
 *                                          properties:
 *                                              number:
 *                                                  type: integer
 *                                                  description: Nro de Orden
 *                                              status: 
 *                                                  type: string
 *                                                  description: Estado de orden
 *                                              date: 
 *                                                  type: string
 *                                                  description: Fecha de carga de la orden
 *                                              total:
 *                                                  type: number
 *                                                  description: Importe a cobrar de la orden
 *                                              ownerFullName:
 *                                                  type: string
 *                                                  description: Nombre completo del propietario
 *                                              carBrand:
 *                                                  type: string
 *                                                  description: Marca del vehículo
 *                                              carModel:
 *                                                  type: string
 *                                                  description: Modelo del vehículo
 *                                              carColor:
 *                                                  type: string
 *                                                  description: Color de vehículo
 *                                              carYear:
 *                                                  type: string
 *                                                  description: Año del modelo
 *                                              carPlate:
 *                                                  type: string
 *                                                  description: Número de patente
 *                                              
 *              500:
 *                  description: Ha ocurrido un error interno en el servidor
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  errCode: 
 *                                      type: integer
 *                                      description: Código interno de error
 *                                  message:
 *                                      type: string
 *                                      description: Mensaje genérico de error
 *                              example:
 *                                  errCode: 1000
 *                                  message: Ha ocurrido un error en intentar ejecutar la operación
 */
routes.get('/orders/', orderController.getOrders);


/**
 * @swagger
 * /orders/{idOrder}:
 *      get:
 *          summary: Recupera un propietario especifico de la base de datos
 *          tags: [Orders]
 *          parameters:
 *              - in: path
 *                name: idOrder
 *                schema:
 *                  type: integer
 *                required: true
 *          responses:
 *              200:
 *                  description: Se recuperan los datos de la orden
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  order:
 *                                      type: object 
 *                                      properties:
 *                                          number:
 *                                              type: integer
 *                                              description: Nro de Orden
 *                                          status: 
 *                                              type: string
 *                                              description: Estado de orden
 *                                          date: 
 *                                              type: string
 *                                              description: Fecha de carga de la orden
 *                                          total:
 *                                              type: number
 *                                              description: Importe a cobrar de la orden
 *                                          ownerFullName:
 *                                              type: string
 *                                              description: Nombre completo del propietario
 *                                          carBrand:
 *                                              type: string
 *                                              description: Marca del vehículo
 *                                          carModel:
 *                                              type: string
 *                                              description: Modelo del vehículo
 *                                          carColor:
 *                                              type: string
 *                                              description: Color de vehículo
 *                                          carYear:
 *                                              type: string
 *                                              description: Año del modelo
 *                                          carPlate:
 *                                              type: string
 *                                              description: Número de patente
 *                                          details:
 *                                              type: array
 *                                              description: Servicios a aplicar
 *                                              items:
 *                                                  type: object
 *                                                  properties:
 *                                                      code:
 *                                                          type: integer
 *                                                          description: Código de servicio
 *                                                      service:
 *                                                          type: string
 *                                                          description: Descripción del servicio
 *                                                      total:
 *                                                          type: number
 *                                                          description: Importe a cobrar por el servicio
 * 
 * 
 *              400:
 *                  description: Ha ocurrido un error de validación de los datos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  errors:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              value:
 *                                                  type: string
 *                                                  description: Valor del campo que generó el error
 *                                              msg:
 *                                                  type: string
 *                                                  description: Mensaje de error
 *                                              param:
 *                                                  type: string
 *                                                  description: Parámetro que género el error
 *                                              location:
 *                                                  type: string
 *                                                  description: Ubicación del error
 * 
 *              404:
 *                  description: No se ha encontrado el recurso
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  errCode: 
 *                                      type: integer
 *                                      description: Código interno de error
 *                                  message:
 *                                      type: string
 *                                      description: Mensaje genérico de error
 *                              example:
 *                                  errCode: 1000
 *                                  message: No se encontró el recurso solicitado
 *              500:
 *                  description: Ha ocurrido un error interno en el servidor
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  errCode: 
 *                                      type: integer
 *                                      description: Código interno de error
 *                                  message:
 *                                      type: string
 *                                      description: Mensaje genérico de error
 *                              example:
 *                                  errCode: 1000
 *                                  message: Ha ocurrido un error en intentar ejecutar la operación
 */
routes.get('/orders/:idOrder', orderValidator.validateIdOrder, orderController.getOrder);

// Agregan y quitan servicios de la orden
routes.post('/orders/:idOrder/services/:idService', orderValidator.validateAddService, orderController.addService);
routes.delete('/orders/:idOrder/services/:idService', orderValidator.validateRemoveService, orderController.removeService);

// Manejan los estados de la orden 
routes.patch('/orders/:idOrder/confirm', orderValidator.validateConfirmOrder, orderController.confirmOrder);
routes.patch('/orders/:idOrder/close', orderValidator.validateCloseOrder, orderController.closeOrder);
routes.patch('/orders/:idOrder/cancel', orderValidator.validateCancelOrder, orderController.cancelOrder);

export default routes;
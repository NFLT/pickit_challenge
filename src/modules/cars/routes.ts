import { Router } from 'express';
import * as carController from './controller';
import * as carValidator from '../../validators/cars';

const routes = Router();


/**
 * @swagger
 * components:
 *  schemas:
 *      Car:
 *          type: object
 *          properties:
 *              carBrand:
 *                  type: string
 *                  description: Marca del vehículo
 *              carModel:
 *                  type: string
 *                  description: Modelo del vehículo 
 *              carYear:
 *                  type: integer
 *                  description: Año del vehículo
 *              carColor: 
 *                  type: string
 *                  description: Color
 *              carPlate:
 *                  type: string
 *                  description: Número de patente
 *              idOwner: 
 *                  type: integer
 *                  description: ID del propietario
 *          required:
 *              - carBrand
 *              - carModel
 *              - carYear
 *              - carColor
 *              - carPlate
 *              - idOwner
 *          example:
 *              carBrand: Toyota
 *              carModel: Corolla XEI
 *              carYear: 2017
 *              carColor: Gris
 *              carPlate: AA111AA
 *              idOwner: 5
 */

/**
 * @swagger
 * /cars:
 *      post:
 *          summary: Crea un automovil en el sistema
 *          tags: [Cars]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Car'
 * 
 *          responses:
 *              201:
 *                  content:
 *                      application/json:
 *                          description: Se ha dado de alta un nuevo vehículo
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  idCar:
 *                                      type: integer
 *                                      description: ID del nuevo vehículo
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
routes.post('/cars/', carValidator.validateCreate, carController.createCar);
routes.put('/cars/:idCar', carValidator.validateUpdate, carController.updateCar);
routes.get('/cars/', carController.getCars);
routes.get('/cars/:idCar', carValidator.validateGetCarById,carController.getCar);
routes.delete('/cars/:idCar', carValidator.validateDelete, carController.deleteCar);

export default routes;
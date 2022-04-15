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
 *              brand:
 *                  type: string
 *                  description: Marca del vehículo
 *              model:
 *                  type: string
 *                  description: Modelo del vehículo 
 *              year:
 *                  type: integer
 *                  description: Año del vehículo
 *              colour: 
 *                  type: string
 *                  description: Color
 *              carPlate:
 *                  type: string
 *                  description: Número de patente
 *              idOwner: 
 *                  type: integer
 *                  description: ID del propietario
 *          required:
 *              - brand
 *              - model
 *              - year
 *              - colour
 *              - carPlate
 *              - idOwner
 *          example:
 *              brand: Toyota
 *              model: Corolla XEI
 *              year: 2017
 *              colour: Gris
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
routes.post('/cars/', carValidator.validateCreate, carController.createCar);

/**
 * @swagger
 * /cars/{idCar}:
 *      put:
 *          summary: Actualiza los datos de un vehículo en base de datos
 *          tags: [Cars]
 *          parameters:
 *              - in: path
 *                name: idCar
 *                schema:
 *                  type: integer
 *                required: true
 * 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Car'      
 * 
 *          responses:
 *              204:
 *                  description: Se actualizan los datos de un vehículo basándose en su ID
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
routes.put('/cars/:idCar', carValidator.validateUpdate, carController.updateCar);

/**
 * @swagger
 * /cars:
 *      get:
 *          summary: Recupera todos los autos registrados en base de datos
 *          tags: [Cars]
 *          responses:
 *              200:
 *                  description: Se obtiene un listado con todos los autos registrados
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  cars:
 *                                      type: array 
 *                                      items:
 *                                          properties:
 *                                              idOwner:
 *                                                  type: integer
 *                                                  description: ID propietario
 *                                              OwnerFullName: 
 *                                                  type: string
 *                                                  description: Nombre completo del propietario
 *                                              idCar: 
 *                                                  type: integer
 *                                                  description: ID del automovil
 *                                              carBrand:
 *                                                  type: string
 *                                                  description: Marca
 *                                              carModel:
 *                                                  type: string
 *                                                  description: Modelo
 *                                              carYear:
 *                                                  type: integer
 *                                                  description: Año del vehículo
 *                                              carColor:
 *                                                  type: string
 *                                                  description: Color de vehículo
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
routes.get('/cars/', carController.getCars);


/**
 * @swagger
 * /cars/{idCar}:
 *      get:
 *          summary: Recupera los datos de un automóvil en particular
 *          tags: [Cars]
 *          parameters:
 *              - in: path
 *                name: idCar
 *                schema:
 *                  type: integer
 *                required: true
 *          responses:
 *              200:
 *                  description: Se obtiene los datos de un vehículo en particular
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  car:
 *                                      type: object 
 *                                      properties:
 *                                          idOwner:
 *                                              type: integer
 *                                              description: ID propietario
 *                                          OwnerFullName: 
 *                                              type: string
 *                                              description: Nombre completo del propietario
 *                                          idCar: 
 *                                              type: integer
 *                                              description: ID del automovil
 *                                          carBrand:
 *                                              type: string
 *                                              description: Marca
 *                                          carModel:
 *                                              type: string
 *                                              description: Modelo
 *                                          carYear:
 *                                              type: integer
 *                                              description: Año del vehículo
 *                                          carColor:
 *                                              type: string
 *                                              description: Color de vehículo
 *                                          carPlate:
 *                                              type: string
 *                                              description: Número de patente
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
routes.get('/cars/:idCar', carValidator.validateGetCarById,carController.getCar);


/**
 * @swagger
 * /cars/{idCar}/history:
 *      get:
 *          summary: Recupera el historial de servicios recibidos por un automóvil
 *          tags: [Cars]
 *          parameters:
 *              - in: path
 *                name: idCar
 *                schema:
 *                  type: integer
 *                required: true
 *          responses:
 *              200:
 *                  description: Se obtiene los datos de un vehículo en particular
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  car:
 *                                      type: object 
 *                                      properties:
 *                                          idOrder:
 *                                              type: integer
 *                                              description: ID de la orden
 *                                          date: 
 *                                              type: string
 *                                              description: Fecha de la orden
 *                                          state: 
 *                                              type: string
 *                                              description: Estado de la orden
 *                                          service:
 *                                              type: string
 *                                              description: Servicio aplicado
 *                                          total:
 *                                              type: number
 *                                              description: Importe del servicio
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
routes.get('/cars/:idCar/history', carValidator.validateGetCarById, carController.getCarHistory);

/**
 * @swagger
 * /cars/{idCar}:
 *      delete:
 *          summary: Elimina un vehículo
 *          tags: [Cars]
 *          parameters:
 *              - in: path
 *                name: idCar
 *                schema:
 *                  type: integer
 *                required: true
 *          responses:
 *              204:
 *                  description: El vehículo se eliminó correctamente
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
routes.delete('/cars/:idCar', carValidator.validateDelete, carController.deleteCar);

export default routes;
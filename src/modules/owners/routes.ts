import { Router } from 'express';
import { validateCreate, validateUpdate, validateIdOwner } from '../../validators/owners';
import * as ownerController from './controller';

const routes = Router();


/**
 * @swagger
 * components:
 *      schemas:
 *          Owner:
 *              type: object
 *              description: Propietario de un vehículo
 *              properties:
 *                  idOwner:
 *                      type: integer
 *                      description: ID del propietario, generado por la base de datos
 *                  name:
 *                      type: string
 *                      description: Nombre 
 *                  surname:
 *                      type: string
 *                      description: Apellido 
 *              required:
 *                  - idOwner
 *                  - name
 *                  - surname
 *              example:
 *                  idOwner: 27
 *                  name: Juan
 *                  surname: Perez
 */


/**
 * @swagger
 * /owners:
 *      post:
 *          summary: Crea un nuevo propietario en base de datos. 
 *          tags: [Owner]
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: Nombre 
 *                              surname:
 *                                  type: string
 *                                  description: Apellido 
 *                          required:
 *                              - name
 *                              - surname
 *                      example:
 *                          name: Juan
 *                          surname: Perez
 *          responses:
 *              201:
 *                  description: Un nuevo propietario se almacenó en base de datos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  idOwner:
 *                                      type: integer
 *                                      description: ID del nuevo propietario
 *                                  msg:
 *                                      type: string
 *                                      description: Mensaje de respuesta
 *                          example: 
 *                              idOwner: 27
 *                              msg: La operación se ha completado satisfactoriamente
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
routes.post('/owners/', validateCreate, ownerController.createOwner);


/**
 * @swagger
 * /owners/{idOwner}:
 *      put:
 *          summary: Actualiza los datos de un propietario en base de datos
 *          tags: [Owner]
 *          parameters:
 *              - in: path
 *                name: idOwner
 *                schema:
 *                  type: integer
 *                required: true
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: Nombre 
 *                              surname:
 *                                  type: string
 *                                  description: Apellido 
 *                          required:
 *                              - name
 *                              - surname
 *                      example:
 *                          name: Juan
 *                          surname: Perez
 *          responses:
 *              204:
 *                  description: Se ha actualizado un propietario en base de datos
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
 *                                  msg:
 *                                      type: string
 *                                      description: Mensaje genérico de error
 *                              example:
 *                                  errCode: 1000
 *                                  msg: Ha ocurrido un error en intentar ejecutar la operación
 *                              
 */
routes.put('/owners/:idOwner', validateUpdate, ownerController.updateOwner);

/**
 * @swagger
 * /owners:
 *      get:
 *          summary: Recupera todos los propietarios registrados en base de datos
 *          tags: [Owner]
 *          responses:
 *              200:
 *                  description: Se obtiene un listado con todos los propietarios almacenados en base de datos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  owners:
 *                                      type: array 
 *                                      items:
 *                                          $ref: '#/components/schemas/Owner'
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
routes.get('/owners/', ownerController.getOwners);


/**
 * @swagger
 * /owners/{idOwner}:
 *      get:
 *          summary: Recupera un propietario especifico de la base de datos
 *          tags: [Owner]
 *          parameters:
 *              - in: path
 *                name: idOwner
 *                schema:
 *                  type: integer
 *                required: true
 *          responses:
 *              200:
 *                  description: Se obtiene un listado con todos los propietarios almacenados en base de datos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  owners:
 *                                      type: object 
 *                                      $ref: '#/components/schemas/Owner'
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
routes.get('/owners/:idOwner', ownerController.getOwner);


/**
 * @swagger
 * /owners/{idOwner}:
 *      delete:
 *          summary: Elimina un propietario de la base de datos
 *          tags: [Owner]
 *          parameters:
 *              - in: path
 *                name: idOwner
 *                schema:
 *                  type: integer
 *                required: true
 *          responses:
 *              204:
 *                  description: Se eliminó un propietario de la base de datos
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
 *                                  errCode: 2001
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
routes.delete('/owners/:idOwner', validateIdOwner, ownerController.deleteOwner);


/**
 * @swagger
 * /owners/{idOwner}/cars:
 *      get:
 *          summary: Recupera los autos correspondientes a cada propietario.
 *          tags: [Owner]
 *          parameters:
 *              - in: path
 *                name: idOwner
 *                schema:
 *                  type: integer
 *                required: true
 *          responses:
 *              200:
 *                  description: Se obtiene un listado con todos los autos  registrados del propietario.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  cars:
 *                                      type: array 
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              idCar:
 *                                                  type: integer
 *                                                  description: ID del auto
 *                                              carBrand:
 *                                                  type: string
 *                                                  description: marca
 *                                              carModel:
 *                                                  type: string
 *                                                  description: Modelo
 *                                              carColor:
 *                                                  type: string
 *                                                  description: Color predominante
 *                                              carPlate:
 *                                                  type: string
 *                                                  description: Número de patente
 *                                              carYear:
 *                                                  type: integer
 *                                                  description: Año del modelo
 *                                          example:
 *                                              idCar: 1
 *                                              carBrand: Toyota
 *                                              carModel: Corolla XEI
 *                                              carColor: Rojo,
 *                                              carPlate: AA111AA
 *                                              carYear: 2019
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
routes.get('/owners/:idOwner/cars', validateIdOwner, ownerController.getCars);

export default routes;
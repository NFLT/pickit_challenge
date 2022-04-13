import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { ErrorCodes, NotFoundError, ValidationError, ConstraintError } from '../errors/database.errors';

import validateResult from '../middlewares/validationResults';

import * as ownerModel from '../modules/owners/model';
import * as carModel from '../modules/cars/model';

/**
 * Valida Se la cadena es un nombre o un apellido
 * @param value
 * @returns Boleano indicando si se trata de un campo inválido
 */
const existOwner = async (idOwner: number) => {
    const owner = await ownerModel.getOwnerById(idOwner);

    if (!owner) {
        let msg = "La persona especificada no se encuentra registrada como propietaria en el sistema";
        throw new NotFoundError(ErrorCodes.NOT_FOUND_OWNER, msg);
    }

    return true;
};


/**
 * Valida Si la cadena es una patente de automóvil
 * @param value
 * @returns Boleano indicando si se trata de un campo inválido
 */
const isCarPlate = (carPlate: string) => {
    const oldPlateFormat = new RegExp('^[A-Z]{2,2}[0-9]{3,3}[A-Z]{2,2}$','i');
    const newPlateFormat = new RegExp('^[A-Z]{3,3}[0-9]{3,3}$','i');
    
    const oldPlate = carPlate.match(oldPlateFormat);
    const newPlate = carPlate.match(newPlateFormat);
    
    
    if (!oldPlate && !newPlate) {
        let msg = "Formato de patente incorrecto! (AAXXXAA o AAAXXX)";
        throw new ValidationError(ErrorCodes.VALIDATION_CAR_PLATE, msg);
    }

    return true;
};


const notExistCarPlate = async (carPlate: string) => {
    const car = await carModel.getCarByPlate(carPlate.toUpperCase()); 

    if (car != null) {
        let msg = "El vehículo que esta intentando ingresar ya se encuentra registrado.";
        throw new ConstraintError(ErrorCodes.CONSTRAINT_DUPLICATED_CAR_PLATE, msg);
    }

    return true;
}



/**
 * Valida si existe el auto especificado
 * @param value
 * @returns Boleano indicando si se trata de un campo inválido
 */
 const existsCar = async (idCar: number) => {
    const car = await carModel.getCars(idCar);
     
    if (!car) {
        let msg = "El auto especificado no se encuentra registrado en el sistema";
        throw new NotFoundError(ErrorCodes.NOT_FOUND_CAR, msg);
    }

    return true;
};

export const validateCreate = [
    check('brand')
        .exists()
        .not()
        .isEmpty(),
    check('model')
        .exists()
        .not()
        .isEmpty(),
    check('year')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({ min: 4, max:4 }),
    check('colour')
        .exists()
        .not()
        .isEmpty(),
    check('carPlate')
        .exists()
        .not()
        .isEmpty()
        .custom(isCarPlate)
        .custom(notExistCarPlate),
    check('idOwner')
        .exists()
        .not()
        .isEmpty()
        .custom(existOwner),
    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];


export const validateUpdate = [
    check('idCar')
        .exists()
        .not()
        .isEmpty()
        .custom(existsCar),
    check('brand')
        .exists()
        .not()
        .isEmpty(),
    check('model')
        .exists()
        .not()
        .isEmpty(),
    check('year')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({ min: 4, max:4 }),
    check('colour')
        .exists()
        .not()
        .isEmpty(),
    check('carPlate')
        .exists()
        .not()
        .isEmpty()
        .custom(isCarPlate),
    check('idOwner')
        .exists()
        .not()
        .isEmpty()
        .custom(existOwner),
    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];

export const validateGetCarById = [
    check('idCar')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom(existsCar),
    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];

export const validateDelete = [
    check('idCar')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom(existsCar),
    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];
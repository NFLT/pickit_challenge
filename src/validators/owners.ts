import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { ErrorCodes, NotFoundError } from '../errors/database.errors';
import validateResult from '../middlewares/validationResults';
import { getOwnerById } from '../modules/owners/model';



/**
 * Valida Se la cadena es un nombre o un apellido
 * @param value
 * @returns Boleano indicando si se trata de un campo inválido
 */
 const existsOwner = async (idOwner: number) => {
    const owner = await getOwnerById(idOwner);
    if (!owner) {
        let msg = "El propietario no existe";
        throw new NotFoundError(ErrorCodes.NOT_FOUND_OWNER, msg)
    }

    return true;
};


/**
 * Valida Se la cadena es un nombre o un apellido
 * @param value
 * @returns Boleano indicando si se trata de un campo inválido
 */
const isNameorSurname = (value: string) => {
    const nameRegexp = new RegExp('^[A-Záéíóúüñ\' \']+$','i');
    const match = value.match(nameRegexp);
    console.log(match);
    if (!match) {
        throw new Error('Este campo solo acepta valores alfabeticos');
    }

    return true;
};


/**
 * Validador para las altas de propietarios
 */
export const validateCreate = [
    check('name')
        .exists()
        .not()
        .isEmpty()
        .custom(isNameorSurname),
    check('surname')
        .exists()
        .not()
        .isEmpty()
        .custom(isNameorSurname),
    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
]; 


/**
 * Validador para las actualizaciónes de propietarios
 */
export const validateUpdate = [
    check('idOwner')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom(existsOwner),
    check('name')
        .exists()
        .not()
        .isEmpty()
        .custom(isNameorSurname),
    check('surname')
        .exists()
        .not()
        .isEmpty()
        .custom(isNameorSurname),
    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];

export const validateIdOwner = [
    check('idOwner')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom(existsOwner),
    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];
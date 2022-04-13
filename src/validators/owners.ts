import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import validateResult from '../middlewares/validationResults';

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

export const validateUpdate = [
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
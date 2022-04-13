import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { ErrorCodes, NotFoundError } from '../errors/database.errors';
import validateResult from '../middlewares/validationResults';
import { getServiceById } from '../modules/services/model';

/**
 * Valida si existe la orden especificada
 * @param value
 * @returns verdadero si existe
 */
 const existService = async (idService: number) => {
    const service = await getServiceById(idService);

    if (!service) {
        let msg = "No existe la ordern especificada";
        throw new NotFoundError(ErrorCodes.NOT_FOUND_ORDER, msg);
    }

    return true;
};


export const validateCreate = [
    check('description')
        .exists()
        .not()
        .isEmpty(),
    check('price')
        .exists()
        .not()
        .isEmpty()
        .isFloat({ gt:0.0 }),
    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
]; 

export const validateUpdate = [
    check('idService')
        .exists()
        .not()
        .isEmpty()
        .custom(existService),
        check('description')
        .exists()
        .not()
        .isEmpty(),
    check('price')
        .exists()
        .not()
        .isEmpty()
        .isFloat({ gt:0.0 }),
    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
]
import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import validateResult from '../middlewares/validationResults';

export const validateCreate = [
    check('name')
        .exists()
        .not()
        .isEmpty()
        .isAlpha(),
    check('surname')
        .exists()
        .not()
        .isEmpty()
        .isAlpha(),
    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
]; 


export const validateUpdate = [
    check('name')
        .exists()
        .not()
        .isEmpty()
        .isAlpha(),
    check('surname')
        .exists()
        .not()
        .isEmpty()
        .isAlpha(),
    (req:Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];